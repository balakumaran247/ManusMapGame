from typing import List, Tuple

from components.helper import get_shortestpath, make_choice, read_json


def generate_question() -> Tuple[str, str]:
    continent_data = read_json(r"./data/continent_countries.json")
    neighbour_data = read_json(r"./data/neighbouring_countries.json")
    choices = ("Asia", "America", "Africa", "Europe", "Asia-Europe", "Asia-Africa")
    continent = make_choice(choices)
    if continent in ("Asia-Europe", "Asia-Africa"):
        continent1, continent2 = continent.split("-")
        countries_list = continent_data[continent1] + continent_data[continent2]
    else:
        countries_list = continent_data[continent]
    return make_choice(countries_list, neighbour_data)


def answer_check(
    start: str, end: str, answer_list: List[str]
) -> Tuple[str, List[str], List[str], List[str]]:
    graph_dict = read_json(r"./data/neighbouring_countries.json")
    answer_path = [start] + answer_list + [end]
    correct_list = [start]
    for ix in range(1, len(answer_path)):
        current = answer_path[ix - 1]
        nxt = answer_path[ix]
        if nxt in graph_dict.get(current, []):
            correct_list.append(nxt)
        else:
            break
    remaining_list = [country for country in answer_path if country not in correct_list]
    if len(correct_list) == len(answer_path):
        result = "You Won"
        shortest_path = []
    else:
        result = "You Lost"
        shortest_path = get_shortestpath(start, end)
    return result, correct_list, remaining_list, shortest_path
