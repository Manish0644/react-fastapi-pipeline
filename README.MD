# 🚀 React + FastAPI Pipeline Builder

A full-stack visual pipeline builder built using React (frontend) and FastAPI (backend).

Users can create nodes and edges visually.  
Backend validates the pipeline and checks whether it forms a DAG (Directed Acyclic Graph).

---

## 🧠 Features

- Visual Node Editor (React)
- Drag & connect nodes
- Create Input / Output / Text nodes
- Backend validation using FastAPI
- Cycle detection using DFS
- Returns:
  - Total Nodes
  - Total Edges
  - is_dag (true/false)

---

## 🏗️ Tech Stack

Frontend:
- React
- Zustand (state management)

Backend:
- FastAPI
- Python
- DFS based cycle detection

---

## ⚙️ Backend Setup

```bash
cd backend
pip install fastapi uvicorn
python3 -m uvicorn main:app --reload
