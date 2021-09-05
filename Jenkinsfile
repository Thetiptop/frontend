node {
    withEnv([
        'IMAGE_NAME = 154265/frontend',
        'DOCKER_CREDENTIALS = credential-docker'
    ]){

          def remote = [:]
            remote.name = 'groupethe'
            remote.host = 'dsp-archiwebo20-mt-ma-ca-fd.fr'
            remote.user = 'groupethe'
            remote.password = 'projetThipTop20'
            remote.allowAnyHosts = true


        stage('checkout') {
            deleteDir()
            checkout scm
        }


        stage('build'){
            frontendImage = docker.build('154265/frontend:latest')
        }


        stage('Deploy our image') {
                docker.withRegistry( '', 'credential-docker' ) {
                    frontendImage.push("latest")
                                 }
                }

                if(env.BRANCH_NAME =="develop") {
                    stage('Remote SSH update preprod') {
                              sshCommand remote: remote, command: 'ls -al'
                              sshCommand remote: remote, command: 'cd workflow && whoami && git branch && ./clear.sh develop frontend'
                                       }

                    }

                if(env.BRANCH_NAME =="prod") {
                       stage('Remote SSH update prod') {
                             sshCommand remote: remote, command: 'ls -al'
                             sshCommand remote: remote, command: 'cd workflow && whoami && git branch && ./clear.sh prod frontend'
                         }

                }
             }

          }
