pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Run Docker App') {
            steps {
                bat 'docker rm -f student-app 2>NUL || exit /b 0'
                bat 'docker build -t student-management .'
                bat 'docker run -d --name student-app -p 5173:5173 student-management'
            }
        }
    }
}
