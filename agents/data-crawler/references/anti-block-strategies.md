# 블록 우회 전략 상세

> 웹 크롤링 시 차단을 방지하기 위한 전략 모음

---

## 1. 요청 제어

### 딜레이 전략

```python
import random
import time

# 고정 딜레이 (비권장)
time.sleep(2)

# 랜덤 딜레이 (권장)
time.sleep(random.uniform(1.0, 3.0))

# 지수 백오프 (에러 시)
def exponential_backoff(attempt, base=1, max_delay=60):
    delay = min(base * (2 ** attempt), max_delay)
    jitter = random.uniform(0, delay * 0.1)
    return delay + jitter
```

### Rate Limiting 대응

| 상황 | 대응 |
|------|------|
| 429 Too Many Requests | 지수 백오프 후 재시도 |
| 503 Service Unavailable | 5-10분 대기 후 재시도 |
| 연속 실패 | 작업 일시 중단, 수동 검토 |

---

## 2. 요청 헤더 관리

### User-Agent 로테이션

```python
USER_AGENTS = [
    # Chrome (Windows)
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    # Chrome (Mac)
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    # Firefox (Windows)
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
    # Safari (Mac)
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
]

import random
headers = {"User-Agent": random.choice(USER_AGENTS)}
```

### 필수 헤더

```python
headers = {
    "User-Agent": "...",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}
```

---

## 3. 세션 관리

### 쿠키 유지

```python
import requests

session = requests.Session()

# 초기 페이지 방문으로 쿠키 획득
session.get("https://example.com")

# 이후 요청에 쿠키 자동 포함
response = session.get("https://example.com/data")
```

### 세션 로테이션

```python
sessions = [requests.Session() for _ in range(5)]

def get_session():
    return random.choice(sessions)
```

---

## 4. 프록시 사용

### 프록시 로테이션

```python
PROXIES = [
    {"http": "http://proxy1:8080", "https": "http://proxy1:8080"},
    {"http": "http://proxy2:8080", "https": "http://proxy2:8080"},
]

response = requests.get(url, proxies=random.choice(PROXIES))
```

### 프록시 유형

| 유형 | 특징 | 용도 |
|------|------|------|
| HTTP | 기본, 빠름 | 일반 크롤링 |
| SOCKS5 | 더 익명 | 민감한 크롤링 |
| Residential | IP 신뢰도 높음 | 엄격한 사이트 |

---

## 5. 행동 패턴 모방

### 자연스러운 브라우징 시뮬레이션

```python
# 메인 페이지 먼저 방문
session.get("https://example.com")
time.sleep(random.uniform(2, 5))

# 서브 페이지 순차 방문
for page in pages:
    session.get(page)
    # 페이지 체류 시간 시뮬레이션
    time.sleep(random.uniform(3, 10))
```

### 마우스 움직임 (브라우저 자동화 시)

```python
from selenium.webdriver.common.action_chains import ActionChains

# 요소까지 자연스럽게 이동
actions = ActionChains(driver)
actions.move_to_element(element)
actions.pause(random.uniform(0.5, 1.5))
actions.click()
actions.perform()
```

---

## 6. robots.txt 준수

### robots.txt 파싱

```python
from urllib.robotparser import RobotFileParser

rp = RobotFileParser()
rp.set_url("https://example.com/robots.txt")
rp.read()

# 크롤링 가능 여부 확인
if rp.can_fetch("*", "/target-path"):
    # 크롤링 진행
    pass
else:
    # 해당 경로 스킵
    pass
```

### Crawl-delay 존중

```python
# robots.txt에서 Crawl-delay 확인
crawl_delay = rp.crawl_delay("*")
if crawl_delay:
    time.sleep(crawl_delay)
```

---

## 7. 에러 처리

### 재시도 로직

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=30)
)
def fetch_with_retry(url):
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    return response
```

### 에러 유형별 대응

| 에러 코드 | 대응 전략 |
|----------|----------|
| 403 Forbidden | User-Agent 변경, 쿠키 확인 |
| 429 Rate Limited | 딜레이 증가, 백오프 |
| 500 Server Error | 잠시 후 재시도 |
| Timeout | 타임아웃 증가, 재시도 |
| Connection Error | 프록시 변경, 네트워크 확인 |

---

## 8. 탐지 우회

### 일반적인 탐지 방법

| 탐지 방법 | 우회 전략 |
|----------|----------|
| IP 기반 | 프록시 로테이션 |
| UA 기반 | User-Agent 로테이션 |
| 행동 패턴 | 랜덤 딜레이, 자연스러운 패턴 |
| JavaScript 검증 | 헤드리스 브라우저 사용 |
| CAPTCHA | 수동 해결 또는 서비스 사용 |

### 헤드리스 브라우저 탐지 우회

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument("--disable-blink-features=AutomationControlled")
options.add_experimental_option("excludeSwitches", ["enable-automation"])
options.add_experimental_option("useAutomationExtension", False)

driver = webdriver.Chrome(options=options)

# navigator.webdriver 숨기기
driver.execute_script(
    "Object.defineProperty(navigator, 'webdriver', {get: () => undefined})"
)
```

---

## 9. 체크리스트

크롤링 전 확인:

```
□ robots.txt 확인했는가?
□ 이용약관에서 크롤링 허용 여부 확인했는가?
□ 적절한 딜레이를 설정했는가?
□ 에러 처리 로직이 있는가?
□ 로그 기록을 설정했는가?
□ 과도한 요청으로 서버에 부담을 주지 않는가?
```
