# Use official Python image
FROM python:3.10-slim

# Set work directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 80

# Run app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "80"]

