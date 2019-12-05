FROM hub.c.163.com/library/node

RUN mkdir -p /home/Service

WORKDIR /home/frontend

COPY . /home/frontend

RUN npm config set registry https://registry.npm.taobao.org \
      && npm install --verbose

EXPOSE 3003
CMD ["npm", "start"]