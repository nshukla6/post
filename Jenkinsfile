pipeline {
  agent any
  stages {
    stage('Code Checkout') {
      steps {
        git(url: 'https://github.com/nshukla6/post', branch: 'main')
      }
    }

    stage('Run Script') {
      steps {
        sh 'ls -la'
      }
    }

  }
}