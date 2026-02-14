
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------- Models -----------

class Node(BaseModel):
    id: str
    type: str
    data: dict

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

# ----------- Helpers -----------

def is_dag(nodes, edges):
    graph = {node.id: [] for node in nodes}
    visited = set()
    recursion_stack = set()

    for edge in edges:
        graph[edge.source].append(edge.target)

    def dfs(node):
        if node in recursion_stack:
            return False
        if node in visited:
            return True

        visited.add(node)
        recursion_stack.add(node)

        for neighbor in graph[node]:
            if not dfs(neighbor):
                return False

        recursion_stack.remove(node)
        return True

    for node in graph:
        if not dfs(node):
            return False

    return True

# ----------- API -----------

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    total_nodes = len(pipeline.nodes)
    total_edges = len(pipeline.edges)
    dag_status = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "total_nodes": total_nodes,
        "total_edges": total_edges,
        "is_dag": dag_status
    }



