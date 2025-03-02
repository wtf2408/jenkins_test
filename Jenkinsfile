pipeline {
    agent { label 'ubuntu' }

    environment {
        SITE_NAME = "jenkins-test"
        SITE_DIR = "/var/www/jenkins-test"
        NGINX_CONF_DIR = "/etc/nginx/sites-available"
        NGINX_ENABLED_DIR = "/etc/nginx/sites-enabled"
        NGINX_CONF_FILE = "jenkins-test.conf"
    }

    stages {
        stage('Checkout') {
            steps {
                pwd()
                checkout scm
            }
        }


        stage('Deploy Files') {
            steps {
                // Загрузка файлов сайта в нужную папку
                sh """
                    sudo mkdir -p ${SITE_DIR}
                    sudo cp -r * ${SITE_DIR}/
                    sudo chown -R www-data:www-data ${SITE_DIR}
                """
            }
        }

        stage('Configure Nginx') {
            steps {
                script {
                    def nginxConfig = """
                    server {
                        listen 81;
                        server_name _;

                        root ${SITE_DIR};
                        index index.html;

                        location / {
                            try_files \$uri /index.html;
                        }
                    }
                    """
                    writeFile file: "${NGINX_CONF_FILE}", text: nginxConfig

                    sh """
                        sudo mv ${NGINX_CONF_FILE} ${NGINX_CONF_DIR}/${NGINX_CONF_FILE}
                        sudo ln -sf ${NGINX_CONF_DIR}/${NGINX_CONF_FILE} ${NGINX_ENABLED_DIR}/${NGINX_CONF_FILE}
                        sudo nginx -t
                        sudo systemctl reload nginx
                    """
                }
            }
        }
    }

    post {
        success {
            echo "Деплой прошел успешно!"
        }
        failure {
            echo "Деплой провалился!"
        }
    }
}
