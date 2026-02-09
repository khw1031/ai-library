# Project Guide

## Available Skills

<available-skills>

<skill name="add-rules" ref=".claude/skills/add-rules">
  <description>프로젝트에 규칙을 Skill 기반으로 추가하고 기존 규칙을 Skill로 변환합니다.</description>
  <trigger>규칙 추가, 룰 추가, rule 추가, 새 규칙, 컨벤션 추가, 스타일 가이드 추가, 가이드라인 추가, 규칙 변환, rule 통합 요청 시 활성화.</trigger>
</skill>

<skill name="create-agent" ref=".claude/skills/create-agent">
  <description>Claude Code Agent를 생성합니다.</description>
  <trigger>에이전트 생성, AGENT.md 작성, 새 에이전트 만들기 요청 시 활성화.</trigger>
</skill>

<skill name="create-ai-tool" ref=".claude/skills/create-ai-tool">
  <description>AI 도구 유형(Skill/Agent)을 결정하고 생성을 안내합니다.</description>
  <trigger>도구 유형 선택, 스킬 vs 에이전트, 어떤 걸 만들어야 할지 요청 시 활성화.</trigger>
</skill>

<skill name="create-skill" ref=".claude/skills/create-skill">
  <description>Claude Code Skill을 생성합니다.</description>
  <trigger>스킬 생성, SKILL.md 작성, 새 스킬 만들기 요청 시 활성화.</trigger>
</skill>

<skill name="git-commit" ref=".claude/skills/git-commit">
  <description>Git 변경 사항을 분석하여 의미있는 커밋 메시지를 자동 생성합니다.</description>
  <trigger>커밋, 커밋 메시지 작성, 변경사항 커밋, git commit 요청 시 사용.</trigger>
</skill>

<skill name="learning-log-generator" ref=".claude/skills/learning-log-generator">
  <description>Git 커밋 히스토리 기반으로 일자별 학습 로그를 생성합니다.</description>
  <trigger>학습 로그, 학습 기록, 일지 생성, recap, 복습 일정, 학습 요약 요청 시 사용.</trigger>
</skill>

<skill name="progressive-disclosure" ref=".claude/skills/progressive-disclosure">
  <description>LLM 컨텍스트 윈도우를 효율적으로 사용하는 3단계 정보 로드 원칙.</description>
  <trigger>Skills, Agents, Prompts 작성 시 참조. SKILL.md, AGENT.md 작성, 프롬프트 설계, 컨텍스트 최적화 시 활성화.</trigger>
</skill>

<skill name="skills-ref" ref=".claude/skills/skills-ref">
  <description>스킬 디렉토리를 스캔하여 CLAUDE.md에 Available Skills 섹션을 XML 구조로 생성합니다.</description>
  <trigger>스킬 등록, 스킬 목록 생성, CLAUDE.md 스킬 섹션, skills ref, 스킬 인덱스, available skills 작성 요청 시 활성화.</trigger>
</skill>

</available-skills>
