import json
import random
from typing import Any, Dict, List, Optional, Sequence, Tuple, overload

import networkx as nx
from pydantic import BaseModel


class AnswerList(BaseModel):
    start: str
    end: str
    item: List[str]


def read_json(filepath: str) -> Dict[str, Any]:
    with open(filepath, mode="r") as file:
        return json.load(file)


@overload
def make_choice(
    primary: Sequence[str], supplementary: Dict[str, List[str]]
) -> Tuple[str, str]: ...
@overload
def make_choice(
    primary: Sequence[str], supplementary: Optional[Dict[str, List[str]]] = None
) -> str: ...


def make_choice(primary, supplementary=None):
    if not supplementary:
        return random.choice(primary)
    first_value: str = random.choice(primary)
    second_value: str = random.choice(
        tuple(set(primary) - set(supplementary.get(first_value, [])) - {first_value})
    )
    return first_value, second_value


def get_shortestpath(start: str, end: str):
    data = read_json(r"./data/neighbouring_countries_edges.json")
    G = nx.Graph()
    G.add_edges_from(data)
    return nx.shortest_path(G, source=start, target=end)
