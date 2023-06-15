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
                        def cleanedMongoUri = MONGO_URI.trim() // Eliminar espacios en blanco al final

                        sh """
                            sed 's|\\${cleanedMongoUri}|${cleanedMongoUri}|g' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        """
                    }
                }
            }
        }
    }
}