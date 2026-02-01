# 데이터 정규화 스키마

> DB 저장을 위한 표준 JSON 스키마 정의

---

## 1. 기본 스키마 구조

### 최상위 구조

```json
{
  "metadata": {
    "source": "string",
    "crawled_at": "ISO8601 datetime",
    "total_items": "number",
    "schema_version": "string",
    "crawler_version": "string"
  },
  "data": [
    { "item": "..." }
  ],
  "errors": [
    { "error": "..." }
  ]
}
```

### 메타데이터 필드

| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| `source` | string | O | 원본 URL 또는 API 엔드포인트 |
| `crawled_at` | string | O | ISO8601 형식 크롤링 시각 |
| `total_items` | number | O | 수집된 총 항목 수 |
| `schema_version` | string | O | 스키마 버전 (semver) |
| `crawler_version` | string | - | 크롤러 버전 |
| `params` | object | - | 크롤링 시 사용된 파라미터 |

---

## 2. 도메인별 스키마

### 게시글/아티클

```json
{
  "id": "unique-id",
  "title": "제목",
  "content": "본문 내용 (HTML 또는 텍스트)",
  "content_text": "HTML 태그 제거된 순수 텍스트",
  "url": "https://...",
  "author": {
    "id": "author-id",
    "name": "작성자명",
    "profile_url": "https://..."
  },
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-16T14:20:00Z",
  "category": "카테고리명",
  "tags": ["tag1", "tag2"],
  "view_count": 1234,
  "like_count": 56,
  "comment_count": 7,
  "images": [
    {
      "url": "https://...",
      "alt": "이미지 설명",
      "width": 800,
      "height": 600
    }
  ],
  "attachments": [
    {
      "name": "파일명.pdf",
      "url": "https://...",
      "size_bytes": 102400,
      "mime_type": "application/pdf"
    }
  ]
}
```

### 상품/제품

```json
{
  "id": "product-id",
  "sku": "SKU-12345",
  "name": "상품명",
  "description": "상품 설명",
  "url": "https://...",
  "brand": "브랜드명",
  "category": {
    "primary": "대분류",
    "secondary": "중분류",
    "tertiary": "소분류"
  },
  "price": {
    "currency": "KRW",
    "original": 50000,
    "sale": 45000,
    "discount_rate": 10
  },
  "availability": {
    "in_stock": true,
    "quantity": 100,
    "status": "available"
  },
  "rating": {
    "average": 4.5,
    "count": 128
  },
  "images": [
    {
      "url": "https://...",
      "type": "main|thumbnail|detail"
    }
  ],
  "specifications": {
    "weight": "500g",
    "dimensions": "10x20x5cm",
    "material": "면 100%"
  },
  "options": [
    {
      "name": "색상",
      "values": ["빨강", "파랑", "검정"]
    },
    {
      "name": "사이즈",
      "values": ["S", "M", "L", "XL"]
    }
  ]
}
```

### 리뷰/댓글

```json
{
  "id": "review-id",
  "parent_id": "article-id or product-id",
  "parent_type": "article|product",
  "author": {
    "id": "user-id",
    "name": "작성자명",
    "is_verified": true
  },
  "content": "리뷰 내용",
  "rating": 4.5,
  "created_at": "2024-01-15T10:30:00Z",
  "helpful_count": 12,
  "reply_count": 3,
  "images": [
    {
      "url": "https://..."
    }
  ],
  "purchase_verified": true
}
```

### 사용자/프로필

```json
{
  "id": "user-id",
  "username": "사용자명",
  "display_name": "표시 이름",
  "profile_url": "https://...",
  "avatar_url": "https://...",
  "bio": "자기소개",
  "joined_at": "2024-01-15T10:30:00Z",
  "stats": {
    "followers": 1234,
    "following": 567,
    "posts": 89
  },
  "badges": ["verified", "premium"],
  "location": "서울, 한국"
}
```

### 이벤트/일정

```json
{
  "id": "event-id",
  "title": "이벤트명",
  "description": "설명",
  "url": "https://...",
  "start_at": "2024-01-15T10:00:00Z",
  "end_at": "2024-01-15T18:00:00Z",
  "timezone": "Asia/Seoul",
  "location": {
    "name": "장소명",
    "address": "주소",
    "lat": 37.5665,
    "lng": 126.9780
  },
  "organizer": {
    "id": "org-id",
    "name": "주최자명"
  },
  "price": {
    "currency": "KRW",
    "amount": 50000,
    "is_free": false
  },
  "capacity": 100,
  "registered_count": 75,
  "categories": ["tech", "conference"]
}
```

---

## 3. 공통 필드 규칙

### ID 생성

```python
import hashlib
from datetime import datetime

def generate_id(source, unique_key):
    """고유 ID 생성"""
    raw = f"{source}:{unique_key}"
    return hashlib.sha256(raw.encode()).hexdigest()[:16]

# 예: generate_id("example.com", "post-123")
# 결과: "a1b2c3d4e5f6g7h8"
```

### 날짜/시간 형식

```python
from datetime import datetime, timezone

# ISO8601 UTC 형식 (권장)
timestamp = datetime.now(timezone.utc).isoformat()
# 결과: "2024-01-15T10:30:00+00:00"

# 또는 Z 접미사
timestamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
# 결과: "2024-01-15T10:30:00Z"
```

### 텍스트 정규화

```python
import re
from html import unescape

def normalize_text(text):
    """텍스트 정규화"""
    if not text:
        return ""

    # HTML 엔티티 디코딩
    text = unescape(text)

    # 연속 공백 제거
    text = re.sub(r'\s+', ' ', text)

    # 앞뒤 공백 제거
    text = text.strip()

    return text
```

### URL 정규화

```python
from urllib.parse import urljoin, urlparse

def normalize_url(base_url, relative_url):
    """URL 정규화"""
    # 상대 경로 → 절대 경로
    absolute_url = urljoin(base_url, relative_url)

    # URL 파싱 및 정리
    parsed = urlparse(absolute_url)

    # 프래그먼트 제거 (선택)
    normalized = f"{parsed.scheme}://{parsed.netloc}{parsed.path}"
    if parsed.query:
        normalized += f"?{parsed.query}"

    return normalized
```

---

## 4. 에러 스키마

```json
{
  "errors": [
    {
      "url": "https://...",
      "error_type": "http_error|parse_error|timeout|validation_error",
      "error_code": "404",
      "message": "Page not found",
      "occurred_at": "2024-01-15T10:30:00Z",
      "retry_count": 3
    }
  ]
}
```

---

## 5. 파일 저장 규칙

### 파일명 규칙

```
{source}_{type}_{date}_{part}.json

예:
- example_com_articles_20240115_001.json
- shop_products_20240115_001.json
- news_reviews_20240115_all.json
```

### 파일 크기 제한

| 항목 | 권장 값 |
|------|--------|
| 단일 파일 최대 크기 | 50MB |
| 단일 파일 최대 항목 | 10,000개 |
| 분할 기준 | 항목 수 또는 파일 크기 |

### 압축

```bash
# gzip 압축 (권장)
gzip data.json  # → data.json.gz

# 압축 해제
gunzip data.json.gz
```

---

## 6. 검증 스키마 (JSON Schema)

### 기본 아티클 검증

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "title", "url", "created_at"],
  "properties": {
    "id": {
      "type": "string",
      "minLength": 1
    },
    "title": {
      "type": "string",
      "minLength": 1,
      "maxLength": 500
    },
    "content": {
      "type": "string"
    },
    "url": {
      "type": "string",
      "format": "uri"
    },
    "created_at": {
      "type": "string",
      "format": "date-time"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  }
}
```

### Python 검증 예시

```python
from jsonschema import validate, ValidationError

schema = { ... }  # 위의 JSON Schema

def validate_item(item):
    """항목 검증"""
    try:
        validate(instance=item, schema=schema)
        return True, None
    except ValidationError as e:
        return False, str(e.message)
```

---

## 7. 체크리스트

데이터 정규화 시 확인:

```
□ 모든 항목에 고유 ID가 있는가?
□ 날짜/시간이 ISO8601 형식인가?
□ URL이 절대 경로인가?
□ 텍스트가 정규화되었는가? (공백, HTML 엔티티)
□ 필수 필드가 모두 존재하는가?
□ 메타데이터에 소스와 크롤링 시각이 있는가?
□ 에러가 별도로 기록되었는가?
```
