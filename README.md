# React + FastAPI Pipeline Builder

A full-stack visual pipeline builder built using React and FastAPI.

---

## 🚀 Features

- Visual node editor (React)
- Create and connect nodes via edges
- Backend validation using FastAPI
- Cycle detection using DFS
- Returns:
  - Total Nodes
  - Total Edges
  - is_dag (true/false)

---

## 🖥️ Backend Setup

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
