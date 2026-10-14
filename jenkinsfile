
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

        stage('Run React App') {
            steps {
                bat 'start "Vite Server" cmd /c "npm run dev -- --host 0.0.0.0"'
            }
        }
    }

    post {
        success {
            echo 'React app started. Open http://localhost:5173'
        }
    }
}
