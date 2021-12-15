# React Study

## StyledComponent

## TypeScript

타입스크립트는 정적 타입 언어로써, 코드가 실행되기 전 (코드 작성 단계) 타입 관련 오류를 확인할 수 있다.

### 이점

- 높은 수준의 코드 탐색과 디버깅

  코드 자동완성 및 코드 작성과 동시에 디버깅이 가능하기에 생산성이 높아집니다.

- 자바스크립트 호환

- 점진적 전환 가능

  특정 기능에만 타입스크립트를 도입하여 일부분에 먼저 타입스크립트를 적용할 수 있습니다.

### Interface

> 객체의 타입을 지정하는 방법

#### styled-component에 타입 지정하기

#### default Props & optional Props

```typescript
interface ContainerProps {
  bgColor: string
  borderColor?: string
}

;<Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />
```
