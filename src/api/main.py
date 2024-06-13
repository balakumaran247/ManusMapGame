from typing import Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from components.helper import AnswerList
from components.process import answer_check, generate_question

__version__ = "1.0.0"

app = FastAPI(title="Manu's Map Game", version=__version__)

origins = [
    "http://localhost:3000",
    "https://manus-map-game.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> Dict[str, str]:
    return {"title": "Manu's Map Game API", "version": __version__}


@app.get("/question")
def question() -> Dict[str, str]:
    start, end = generate_question()
    return {"start": start, "end": end}


@app.post("/result")
def result(answers: AnswerList) -> Dict[str, (str | List[str])]:
    verdict, correct_list, wrong_list, shortest_path = answer_check(
        answers.start, answers.end, answers.item
    )
    return {
        "result": verdict,
        "correct_path": correct_list,
        "wrong_path": wrong_list,
        "shortest_path": shortest_path,
    }
