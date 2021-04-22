#!groovy

pipeline {

  agent {
    label 'node'
  }

  options {
    buildDiscarder(logRotator(numToKeepStr:'20'))
    skipDefaultCheckout()
    disableConcurrentBuilds()
    timeout(time: 60, unit: 'MINUTES')
  }

  stages {

    // --- BUILD FRONTEND ---
    stage('Frontend') {
      agent {
        label "node"
      }
      steps {
        deleteDir()
        checkout scm
        sh "make build-frontend"
      }
    }

    // --- DEPLOYMENT TO digitaloffice.kitconcept.io ---
    stage('Deployment to digitaloffice.kitconcept.io') {
      agent {
        label 'kitconcept.io'
      }
      when {
        branch 'main'
      }
      steps {
        checkout scm
        sh 'make deploy-staging'
      }
      post {
        success {
          addShortText(text: '❯ digitaloffice.kitconcept.io', border: 0, link: 'https://digitaloffice.kitconcept.io')
        }
      }
    }

  }

  post {
    success {
      slackSend (
        channel: "ci",
        color: 'good',
        message: "SUCCESS: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    failure {
      slackSend (
        channel: "ci",
        color: 'danger',
        message: "FAILURE: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    unstable {
      slackSend (
        channel: "ci",
        color: 'warning',
        message: "UNSTABLE: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    aborted {
      slackSend (
        channel: "ci",
        color: 'danger',
        message: "ABORTED: #${env.BUILD_NUMBER} ${env.JOB_NAME} (${env.BUILD_URL})"
      )
    }
    always {
      sh 'rm -rf node_modules *.tgz'
    }
  }
}

