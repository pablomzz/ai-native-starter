"""Run with: npm run start (which runs python src/main.py)."""
from datetime import datetime


def greeting(hour: int) -> str:
    """A tiny function with a test, so the feedback loop works from day one."""
    if hour < 12:
        return "Good morning"
    if hour < 18:
        return "Good afternoon"
    return "Good evening"


if __name__ == "__main__":
    print(greeting(datetime.now().hour))
