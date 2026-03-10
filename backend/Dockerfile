FROM python:3.11-slim

WORKDIR /app

# Install only essential system deps
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Upgrade pip first
RUN pip install --no-cache-dir --upgrade pip

# Install dependencies in one layer
COPY requirements.txt .
RUN pip install --no-cache-dir \
    --no-deps \
    -r requirements.txt

# Copy source code
COPY . .

# Create non-root user
RUN adduser --disabled-password --gecos "" appuser \
    && chown -R appuser /app
USER appuser

EXPOSE $PORT

# Use shell form so $PORT env var is expanded correctly on Render
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}

