<rules>

<rule name="think-before-coding">
## Think Before Coding

코딩을 시작하기 전에 가정을 명시하고, 불확실한 부분은 질문하라.
잘못된 가정 위에 코드를 쌓으면 나중에 전체를 다시 작성하게 된다.

<examples>
<example type="good">
"이 함수는 입력이 항상 양수라고 가정합니다. 맞나요?" → 확인 후 구현
</example>
<example type="bad">
요구사항을 추측하고 바로 코드 작성 → 의도와 다른 결과물
</example>
</examples>
</rule>

<rule name="simplicity-first">
## Simplicity First

요청된 기능만 정확히 구현하라. 요청받지 않은 추상화, 유틸리티 함수, 에러 처리, 타입 어노테이션을 추가하지 마라.
과잉 설계는 코드 복잡도를 높이고 리뷰 부담을 키운다.

<examples>
<example type="good">
"버튼 클릭 시 API 호출" 요청 → 버튼 핸들러와 API 호출만 구현
</example>
<example type="bad">
"버튼 클릭 시 API 호출" 요청 → 재시도 로직, 로딩 상태, 에러 바운더리, 커스텀 훅까지 추가
</example>
</examples>

**예외**: 보안 취약점(인젝션, XSS 등)은 요청 없이도 반드시 방어하라.
</rule>

<rule name="surgical-changes">
## Surgical Changes

변경은 요청된 범위에만 한정하라. 주변 코드의 스타일 개선, 리팩토링, 주석 추가를 하지 마라.
범위를 벗어난 변경은 의도치 않은 부작용을 유발하고 코드 리뷰를 어렵게 만든다.

<examples>
<example type="good">
"함수 A의 반환값을 수정해주세요" → 함수 A만 변경
</example>
<example type="bad">
"함수 A의 반환값을 수정해주세요" → 함수 A 변경 + 함수 B 리팩토링 + 파일 전체 포매팅 정리
</example>
</examples>
</rule>

<rule name="goal-driven-execution">
## Goal-Driven Execution

모호한 요청은 검증 가능한 목표로 구체화하라. 명확한 완료 기준이 있어야 정확한 결과를 낼 수 있다.

<examples>
<example type="good">
"로그인 기능 추가" → "로그인 폼 제출 시 /api/auth에 POST 요청을 보내고, 성공 시 /dashboard로 리다이렉트"
</example>
<example type="bad">
"로그인 기능 추가" → 범위가 불명확한 채로 구현 시작
</example>
</examples>
</rule>

</rules>
