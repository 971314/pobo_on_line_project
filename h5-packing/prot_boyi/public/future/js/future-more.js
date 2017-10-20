function cancel() {
  $('.my-modal').addClass('hide');
}

function confirm() {
  $('.my-modal').removeClass('hide');
}

function logout() {
    pbApi.wt_loginOut();
    pbApi.wt_setCurrentAccLoginOutState();
}

$('.my-modal-backdrop').click(cancel);
if(typeof pbE == 'undefined'){
  $('#goBack').click(function () {
    location.href = document.referrer;
  });
  $.get('../conf/future.json',process);
}else{
  $('#goBack').click(function () {
    location.href = 'goBack';
  })
  process(JSON.parse(pbApi.sys_readConfig('future/conf/future.json')));
}
function process(data) {
  var e = data.more;
  var s = '';
  e.stacked.forEach(function (i) {
    s += '<li class="login"><a href="'+i.url+'">'+i.name+'<img class="more" src="../images/more.png" alt="详细"></a></li>'
  });
  $('.nav-stacked').html(s);
}