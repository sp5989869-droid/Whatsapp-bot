const start=document.getElementById('start'),stop=document.getElementById('stop'),video=document.getElementById('preview'),status=document.getElementById('status'),ocr=document.getElementById('ocr');
let stream=null,timer=null;
start.onclick=async()=>{
 try{
  stream=await navigator.mediaDevices.getDisplayMedia({video:true,audio:false});
  video.srcObject=stream; status.textContent='Estado: captura ativa';
  start.disabled=true; stop.disabled=false;
  stream.getVideoTracks()[0].addEventListener('ended',stopCapture);
  timer=setInterval(readScreen,5000); await readScreen();
 }catch(e){status.textContent='Estado: captura não autorizada';ocr.textContent=e.message||String(e)}
};
stop.onclick=stopCapture;
function stopCapture(){
 if(timer)clearInterval(timer); timer=null;
 if(stream)stream.getTracks().forEach(t=>t.stop());
 stream=null;video.srcObject=null;status.textContent='Estado: parado';start.disabled=false;stop.disabled=true;
}
async function readScreen(){
 if(!video.videoWidth)return;
 const c=document.createElement('canvas');c.width=video.videoWidth;c.height=video.videoHeight;
 c.getContext('2d').drawImage(video,0,0);
 ocr.textContent='A ler o ecrã...';
 try{const r=await Tesseract.recognize(c,'por');ocr.textContent=r.data.text.trim()||'Nenhum texto reconhecido.'}
 catch(e){ocr.textContent='Erro na leitura: '+(e.message||e)}
}
