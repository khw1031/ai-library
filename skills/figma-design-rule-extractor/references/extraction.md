# 추출 상세 - MCP 도구 사용법

## 사용 MCP 도구

| 도구 | 용도 | 반환 형식 |
|------|------|----------|
| `get_metadata` | 레이어 구조, Annotation, Description | XML |
| `get_variable_defs` | 디자인 토큰 (Variables) | JSON |
| `get_design_context` | 선택 영역의 스타일 정보 | JSON |

---

## 1. get_metadata

### 호출

```
MCP Tool: get_metadata

Parameters:
- fileKey: Figma 파일 키 (URL에서 추출)
- nodeId: 특정 노드 ID (선택)
- clientLanguages: "typescript, css"
- clientFrameworks: "react, tailwind"
```

### fileKey 추출

```
https://www.figma.com/file/ABC123DEF/Design-System?node-id=0:1
                          ^^^^^^^^^ fileKey        ^^^ nodeId
```

### 응답 예시

```xml
<CANVAS name="Components" id="0:1">
  <FRAME name="Buttons" id="1:100">
    <COMPONENT name="Button/Primary" id="1:101"
               description="기본 액션 버튼. CTA에 사용.">
      <FRAME name="Label" id="1:102" />
      <FRAME name="Icon" id="1:103" />
    </COMPONENT>
    <COMPONENT name="Button/Secondary" id="1:104" />
    <COMPONENT name="Button/Ghost" id="1:105" />
  </FRAME>
  <FRAME name="Inputs" id="2:100">
    <!-- ... -->
  </FRAME>
</CANVAS>
```

### 추출할 정보

| 항목 | XML 속성/요소 | 용도 |
|------|-------------|------|
| 컴포넌트명 | `COMPONENT/@name` | 공통 컴포넌트 목록 |
| 설명 | `@description` | 사용 가이드 |
| 노드 ID | `@id` | 병렬 처리용 |
| 레이어 구조 | 중첩 구조 | 레이아웃 패턴 분석 |

### Annotation 추출

Figma의 Annotation은 별도 레이어로 존재할 수 있음:

```xml
<FRAME name="📝 Annotation" id="...">
  <TEXT>최소 터치 영역: 44x44px</TEXT>
</FRAME>
```

이름에 📝, Annotation, Note 등이 포함된 프레임/텍스트를 수집합니다.

---

## 2. get_variable_defs

### 호출

```
MCP Tool: get_variable_defs

Parameters:
- fileKey: Figma 파일 키
- nodeId: (선택, 보통 전체 파일)
- clientLanguages: "typescript, css"
- clientFrameworks: "react, tailwind"
```

### 응답 예시

```json
{
  "color/primary/50": "#E6F0FF",
  "color/primary/500": "#007AFF",
  "color/primary/900": "#002952",
  "color/text/primary": "#1A1A1A",
  "color/text/secondary": "#666666",
  "spacing/1": "4px",
  "spacing/2": "8px",
  "spacing/4": "16px",
  "radius/sm": "4px",
  "radius/md": "8px",
  "shadow/sm": "0 1px 2px rgba(0,0,0,0.05)",
  "font/size/sm": "14px",
  "font/size/base": "16px",
  "font/weight/medium": "500"
}
```

### 토큰 카테고리 분류

| 패턴 | 카테고리 |
|------|---------|
| `color/*` | 색상 |
| `spacing/*` | 간격 |
| `radius/*` | 테두리 반경 |
| `shadow/*` | 그림자 |
| `font/*` | 타이포그래피 |
| `breakpoint/*` | 반응형 |

---

## 3. 병렬 처리

### 언제 병렬 처리하는가

```
조건:
- 최상위 CANVAS/FRAME이 5개 이상
- 레이어 depth가 4 이상
- 단일 호출 응답이 너무 큰 경우 (타임아웃)
```

### 병렬 처리 방법

1. 먼저 `get_metadata`로 최상위 구조 파악
2. 각 페이지/섹션의 nodeId 추출
3. 개별 nodeId로 병렬 호출

```
# 예시: 페이지별 병렬 호출
├─ get_metadata(fileKey, "0:1")   # Components 페이지
├─ get_metadata(fileKey, "0:2")   # Layouts 페이지
├─ get_metadata(fileKey, "0:3")   # Patterns 페이지
└─ get_variable_defs(fileKey)     # 토큰 (병렬)
```

### 결과 병합

각 호출 결과를 카테고리별로 병합:

```markdown
## 병합된 결과

### Components (0:1에서)
- Button, Input, Card ...

### Layouts (0:2에서)
- AppShell, AuthLayout ...

### Tokens (variable_defs에서)
- Colors, Spacing, Typography ...
```

---

## 4. 에러 처리

### MCP 연결 실패

```
→ MCP 설정 안내 출력 (SKILL.md 참조)
```

### 권한 오류

```
Error: Access denied

→ "Figma 파일에 대한 View 권한이 필요합니다.
   파일 공유 설정을 확인하거나, 토큰 권한을 확인하세요."
```

### 타임아웃

```
Error: Request timeout

→ "파일이 너무 큽니다. 특정 페이지의 nodeId를 지정해주세요.
   예: ?node-id=0:1"
```

### Variables 없음

```
Warning: No variables found

→ "Figma Variables가 정의되지 않았습니다.
   - Figma Pro/Enterprise 플랜 필요
   - 또는 Variables 대신 Styles 사용 중

   Styles 기반으로 토큰을 추정합니다..."
```
