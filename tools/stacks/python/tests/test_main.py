"""Run with: npm run test (which runs python -m pytest). Install once: python -m pip install pytest ruff"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))

from main import greeting  # noqa: E402


def test_morning_afternoon_evening():
    assert greeting(9) == "Good morning"
    assert greeting(14) == "Good afternoon"
    assert greeting(20) == "Good evening"
