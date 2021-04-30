# Backend
(cd /srv/avatario-server/ && git fetch --all && git reset --hard origin/main)
(cd /srv/avatario-server/ && npm install)
(cd /srv/avatario-server/ && pm2 restart digitaloffice-server)
# Frontend
(cd /srv/digitaloffice.kitconcept.io/ && git fetch --all && git reset --hard origin/main)
(cd /srv/digitaloffice.kitconcept.io/ && yarn && yarn build)
