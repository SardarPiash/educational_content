import zim, { Circle, Container, animate, timeout } from "./zim.js";

const frame = new Frame("fit", 1920, 1080, "#edf0f2");
frame.on("ready", () => {
    const bg = new Pic("assets/images/bg.png").center();
    const w = new Window({scrollBarAlpha:1,scrollBarColor:black,width:1420,height:673,scrollBarDrag:true, padding:20,backgroundColor:white}).center().pos(176,240);
    
    let pos=0
    for(var i=0;i<3;i++){
        const rect =new Rectangle({width:700, height:100, color:blue, corner:20}).center().pos(200+pos,200);
        pos=pos+700
        w.add(rect)
    }

});