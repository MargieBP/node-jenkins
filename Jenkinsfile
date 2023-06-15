pipeline {
    agent any

    stages {
        stage ('Clonar el Repositorio') {
            steps {
                git branch: 'main',
                credentialsId: 'git-jenkins',
                url: 'https://github.com/MargieBP/node-jenkins.git'
            }
        }

        stage ('Construir imagen de Docker'){
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]){
                        docker.build('proyectos-backend-micro:v1', '--build-arg MONGO_URI=${MONGO_URI} .')
                    }
                }  
            }
        }

        stage ('Desplegar contenedores Docker') {
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]){
                        sh """
                            sed 's|\\${MONGO_URI}|${MONGO_URI}|g' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            emailext {
                body: "Estado del build: ${currentBuild.currentResult}"
                subject: "Despliegue de Proyecto. Ver detalles: ${env.BUILD_URL} "
                to: "carlos.gomez@est.iudigital.edu.co",
                from: "margie.potes@est.iudigital.edu.co"
            }
        }        
    }
}