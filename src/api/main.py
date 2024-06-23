from typing import Any, Dict

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

from components.helper import AnswerList
from components.process import answer_check, check_question, generate_question

__version__ = "1.0.0"

app = FastAPI(title="Manu's Map Game", version=__version__)
favicon_path = "favicon.ico"

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
    return {
        "title": "Manu's Map Game API",
        "version": __version__,
        "url": ", ".join(origins[1:]),
    }


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse(favicon_path)


@app.get("/question")
def question() -> Dict[str, str]:
    start, end = generate_question()
    return {"start": start, "end": end}


@app.get("/check")
def check(start: str, end: str) -> bool:
    return check_question(start, end)


@app.post("/result")
def result(answers: AnswerList) -> Dict[str, Any]:
    verdict, correct_list, wrong_list, shortest_path, boundaries, centroids = (
        answer_check(answers.start, answers.end, answers.item)
    )
    return {
        "result": verdict,
        "correct_path": correct_list,
        "wrong_path": wrong_list,
        "shortest_path": shortest_path,
        "boundaries": boundaries,
        "centroids": centroids,
    }
