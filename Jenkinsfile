pipeline {
    agent any    
    environment {
        imageName = "myphpapp"
        registryCredentials = "nexus"
        registry = "localhost:9000/repository/DockerRepo/"
        dockerImage = ''
    }
  
    stages {
         stage ("Clean up"){
      steps {
        deleteDir()
      }
    }
     
        stage('Build phase') {
            steps {
                dir('Backend') {
                    script {
                        bat 'mvn install' // Or 'gradle build' for Gradle projects                    

                    }
                }
            }
        }
       
        stage('Unit Tests phase') {
            steps {
                dir('Backend') {
                    script {
                        bat 'mvn test' // This assumes you have configured Maven to run your unit tests
                    }
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'SonarQubeScanner' // Make sure 'SonarQubeScanner' is configured in Jenkins

                    withSonarQubeEnv('sonarqube') {
                // Pass SonarQube properties as command-line arguments
                        def sonarScannerCmd =   "${scannerHome}/bin/sonar-scanner" +
                                                " -Dsonar.projectKey=Agro" +
                                                // " -Dsonar.sources=Backend/src" +
                                                " -Dsonar.java.binaries=Backend/target/classes" +
                                                " -Dsonar.java.test.binaries=Backend/target/test-classes" +
                                                " -Dsonar.junit.reportPaths=Backend/target/surefire-reports"+
                                                " -Dsonar.coverage.jacoco.xmlReportPaths=Backend/target/site/jacoco/jacoco.xml"+
                                                " -Dsonar.coverage.exclusions=**/DTO/*.java,**Tests/*.java,**/target/**,Frontend/**"



                        bat sonarScannerCmd
                    }
                }
            }
        }

        stage('Building images and Running containers') {
            steps {
           
                bat 'docker pull mongo' // Pull the Mongo image if it doesn't exist locally
                bat 'docker-compose up -d'
            }
        }
     
       stage('Uploading Mongo image to Nexus') {
            steps {
                script {
                    docker.withRegistry('http://localhost:8087', 'nexus') {
                        bat 'docker tag mongo:latest localhost:8087/mongo:latest'
                        bat 'docker push localhost:8087/mongo:latest'
                    }
                }
            }
        }


        stage('Uploading Backend image to Nexus') {
            steps {
                script {
                        bat 'docker tag backend:latest localhost:8087/backend:latest'
                        bat 'docker push localhost:8087/backend:latest'
                    
                }              
            }
        }
        stage('Uploading Frontend image to nexus') {
            steps {
                script {
                        bat 'docker tag frontend:latest localhost:8087/frontend:latest'
                        bat 'docker push localhost:8087/frontend:latest'
                    
                }                
            }
        }
    //   stage('Sending Email') {
    //         steps {
    //             mail bcc: '', 
    //             body: "${currentBuild.currentResult}: Job ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}",                cc: '', 
    //             from: '', 
    //             replyTo: '', 
    //             subject: "jenkins build:${currentBuild.currentResult}: ${env.JOB_NAME}",
    //             to: 'mohamed.bouhdida@sesame.com.tn'            }
    //     }
    }
    post {
        always {
        // This block will always run, even if previous stages fail
            script {
            // Send a custom notification at the end of the pipeline
                mail bcc: '', 
                body: "Custom notification: ${currentBuild.currentResult}: ${env.JOB_NAME}\nMore Info can be found here: ${env.BUILD_URL}", 
                cc: '', 
                from: '', 
                replyTo: '', 
                subject: "Custom Notification: ${currentBuild.currentResult}: ${env.JOB_NAME}",
                to: 'mohamed.bouhdida@sesame.com.tn'
            }
        }
    }
}
