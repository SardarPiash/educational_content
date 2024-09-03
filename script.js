import zim, { Circle, Container, animate, timeout } from "./zim.js";

class DrawGraph {
  constructor(numberOfLineX,numberOfLineY, lengthForVertical,lengthForHorizontal, redColor, blueColor, lineX, lineY,n) {
    this.numberOfLineX = numberOfLineX;
    this.numberOfLineY = numberOfLineY;
    this.lengthForVertical = lengthForVertical;
    this.lengthForHorizontal = lengthForHorizontal;
    this.redColor = redColor;
    this.blueColor = blueColor;
    this.lineX = lineX;
    this.lineY = lineY;
    this.scaleX = 1/2;
    this.scaleY = n>50? 5: 10;
    this.radious=4;
    this.container = new Container().center();
    this.verticalLines(this.numberOfLineX)
    this.horizontalLines(this.numberOfLineY)
    
  }

  verticalLines(numberOfLine) {
    let lineArray = [];
    let posChangeOnY = 0;

    for (let i = 0; i < numberOfLine; i++) {
      const color = i % 5 !== 0 ? this.redColor : this.blueColor;
      const line = new zim.Line({ length: this.lengthForVertical, thickness: 1, color: color })
                    .center()
                    .pos(this.lineX, this.lineY + posChangeOnY);
    
      lineArray.push(line); 
      posChangeOnY += 10; 
    }
    //return lineArray;
  }

  horizontalLines(numberOfLine) {
    let lineArray = [];
    let posChangeOnX = 0;

    for (let i = 0; i < numberOfLine; i++) {
      const color = i % 5 !== 0 ? this.redColor : this.blueColor;
      const line = new zim.Line({ length: this.lengthForHorizontal, thickness: 1, color: color })
                    .center()
                    .rot(90) 
                    .pos(this.lineX + posChangeOnX, this.lineY);
    
      lineArray.push(line); 
      posChangeOnX += 10; 
    }
  }

  scaleChange(p){
    const c ={};
    const r ={};
    c.x=44;
    c.y=250;
    r.x = c.x + p.x*this.scaleX;
    r.y = c.y -p.y*this.scaleY;
    return r;
  }
  addPoint(p,v){
    const q = this.scaleChange(p);
    const circle=new Circle(this.radious).center().mov(q.x-this.radious/2-1,q.y-this.radious/2-1);
    
    const label=new zim.Label({
                    text:`(${p.x},${p.y})`,
                    size:15,
                    font:"courier",
                    color:black,
                    rollColor:black,
                }).center().pos(v==1?circle.x+20:v==2?circle.x+20:circle.x-80,circle.y-20)
    const r = {
      x: circle.x,
      y: circle.y
    }
    return r;
  }

  

  addPointOnDrag(p){
    const q = this.scaleChange(p);
    const circle=new Circle(this.radious).center().mov(q.x-this.radious/2-1,q.y-this.radious/2-1);
    const button =new zim.Button({
                        label:"",
                        width:10,
                        height:10,
                        backgroundColor:"red",
                        rollBackgroundColor:"transparent",
                        gradient:.3,
                        corner:2
                    }).center().pos(circle.x-5,circle.y-5);
    const r = {
      x: circle.x,
      y: circle.y
    }
    return {r,button};
  }

  drawLine(p1,p2){
    //console.log("drawline",p1,p2)
    const shape =new zim.Shape().s(black).ss(1).mt(p1.x-960,p1.y-540).lt(p2.x-960,p2.y-540).center().alp(1);
    return shape;
  }

}


// cumalative frequency

function getCumulativeFrequency(frequencies){
  const cumulativeFrequency = [];
  cumulativeFrequency.push(0);
  frequencies.forEach((frequency, index) =>{
    cumulativeFrequency.push(frequency+cumulativeFrequency[index]);
  })
  return cumulativeFrequency;
}



// Function to initialize the application
async function init() {
  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  // Destructure the loaded data
  const {
    headingjson_4,
    headingjson_5,
    lang,
    headingjson_1,
    headingjson_3,
    headerText,
    chapter,
    chapterNoText
  } = data;
  const {
    Frame,
    Pic,
    Button,
    Slider,
    Label,
    Rectangle,
    TextArea,
    Container,
  } = zim;

  const frame = new Frame("fit", 1920, 1080, "#edf0f2");
  frame.on("ready", () => {
    let totalRect;
    const randomNumbers = [];
    const maxMin = {};
    ///heading_label_img
    let heading_label_X = 160;
    let heading_label_Y = 290;
    ///three color rect
    let whiteRect = [];
    let greenRect = [];
    let grayRect = [];
    var findFixi = [];
    const slider_1 = new Pic("assets/images/slider_1.png")
      .center()
      .pos(heading_label_X + 1484, heading_label_Y - 90).alp(1).sca(.9);
      new Label({
        text:headerText.text[lang],
        size:headerText.size[lang],
        font:"courier",
        color:black,
        rollColor:black,
        bold:true,
     }).center().pos(370,85);
     new Label({
      text:headerText.subtext[lang],
      size:30,
      font:"courier",
      color:black,
      rollColor:black,
      bold:true,
   }).center().pos(360,145);


    function getRandomNumber(min_1, max_1, min_2, max_2) {
      let a = Math.floor(Math.random() * (max_1 - min_1 + 1)) + min_1;
      let b = Math.floor(Math.random() * (max_2 - min_2 + 1)) + min_2;

      a = a * 50;
      b = b * 50;
      console.log(a, ">", b);

      totalRect = (b - a) / 10;

      console.log(totalRect, "r");

      maxMin.a = a;
      maxMin.b = b;
      maxMin.totalRect = totalRect;
    }

    getRandomNumber(4, 8, 12, 20);

    const heading_labelImg_1 = new Rectangle(200, 80, blue)
      .center()
      .pos(heading_label_X + 8, heading_label_Y);
    const heading_labelImg_3 = new Rectangle(200, 80, blue)
      .center()
      .pos(heading_label_X + 210, heading_label_Y);
    const heading_labelImg_4 = new Rectangle(200, 80, blue)
      .center()
      .pos(heading_label_X + 412, heading_label_Y);
      const heading_labelImg_5 = new Rectangle(200, 80, blue)
      .center()
      .pos(heading_label_X + 614, heading_label_Y);

    ///lable for heading img

    const headingLabel_1 = new Label({
      text: headingjson_1.text[lang],
      size: 20,
      font: "courier",
      color: black,
      bold: true,
    })
      .center()
      .pos(heading_label_X + 20, heading_label_Y + 30);
    const headingLabel_3 = new Label({
      text: headingjson_3.text[lang],
      size: 20,
      font: "courier",
      color: black,
      bold: true,
    })
      .center()
      .pos(heading_label_X + 240, heading_label_Y + 30);
    const headingLabel_4 = new Label({
      text: headingjson_4.text[lang],
      size: 20,
      font: "courier",
      color: black,
      bold: true,
    })
      .center()
      .pos(heading_label_X + 490, heading_label_Y + 30);
      const headingLabel_5 = new Label({
        text: headingjson_5.text[lang],
        size: 20,
        font: "courier",
        color: black,
        bold: true,
      })
        .center()
        .pos(heading_label_X + 700, heading_label_Y + 30);


    ///three color rect

    function whiteRectDraw() {
      let pos = 0;
      for (var i = 0; i < 10; i++) {
        let Rect = new Rectangle({
          width: 200,
          height: 40,
          color: "#5BAAD4",
        })
          .center()
          .pos(heading_label_X + 8, heading_label_Y + 86 + pos);
        pos = pos + 41;
        whiteRect.push(Rect);
        
      }
    }
    whiteRectDraw();

    function greenRectDraw() {
      let pos = 0;
      for (var i = 0; i < 10; i++) {
        let Rect = new Rectangle({
          width: 200,
          height: 40,
          color: "#98da85",
        })
          .center()
          .pos(heading_label_X + 210, heading_label_Y + 86 + pos);
        pos = pos + 41;
        greenRect.push(Rect);
      }
    }
    greenRectDraw();

    let yellowRect = [];
    function yellowRectDraw() {
      let pos = 0;
      for (var i = 0; i < 10; i++) {
        let Rect = new Rectangle({
          width: 200,
          height: 40,
          color: "#d7b98a",
        })
          .center()
          .pos(heading_label_X + 410, heading_label_Y + 86 + pos);
        pos = pos + 41;
        yellowRect.push(Rect);
      }
    }
    yellowRectDraw();

    function grayRectDraw() {
      let pos = 0;
      for (var i = 0; i < 10; i++) {
        let Rect = new Rectangle({
          width: 200,
          height: 40,
          color: "#d7b98a",
        })
          .center()
          .pos(heading_label_X + 612, heading_label_Y + 86 + pos);
        pos = pos + 41;
        grayRect.push(Rect);
      }
    }
    grayRectDraw();

    let totalDay = 0;
    //call the draw class
   



    // Print array elements and make them draggable
    //genarate total number of question array
    let Array = [];
    for (let i = 0; i < 10; i++) {
      Array.push(0);
    }
    let dayNumber = [];
    let classDifference =[]
    
    const firstStep = [];
      const lastStep = [];
    function generateQuestionArray(count) {
      const { a, b } = maxMin;
      let pos_1 = 0;
      let flag;
      
      var buttons = [];
      var showFinalSumInput = 0;
      let inputValue = 0;
      for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * (b - a + 1)) + a;
        randomNumbers.push(randomNumber);
      }
      
      for (let i = 0; i < count; i++) {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        totalDay = totalDay + randomNumber;
        dayNumber.push(randomNumber);
      }
      
      let step_1 = 0;
      let step_2 = 0;
    // Generate the steps based on a and totalRect
    for (let i = 0; i < 10; i++) {
        step_1 = a + (i * totalRect);
        step_2 = step_1 + totalRect;
        firstStep.push(step_1);
        lastStep.push(step_2);
        classDifference.push((Math.floor((firstStep[i]+lastStep[i])/2)));
    }
      new Label({
        text: `n = ${totalDay}`,
        size: 40,
        font: "courier",
        color: black,
        bold: true,
      })
        .center()
        .pos(heading_label_X + 240, heading_label_Y + 510);

      for (var i = 0; i < 10; i++) {
        buttons[i] = new Button({
          label: "",
          width: 10,
          height: 10,
          backgroundColor: "red",
          rollBackgroundColor: "green",
          corner: 6,
        })
          .center()
          .pos(heading_label_X + 582, heading_label_Y + 98 + pos_1)
          .alp(0);

        findFixi[i] = randomNumbers[i] * dayNumber[i];

        const step = new Label({
          text: `${firstStep[i]}-${lastStep[i]}`,
          size: 20,
          font: "courier",
          color: "black",
          bold: true,
        })
          .center()
          .pos(heading_label_X + 70, heading_label_Y + 100 + pos_1);

        let numberOfFriends = new Label({
          text: dayNumber[i],
          size: 30,
          font: "courier",
          color: "black",
          bold: true,
        })
          .center()
          .pos(greenRect[0].x + 100, greenRect[0].y + 10 + pos_1);



          let classDifferenceLabel = new Label({
            text: classDifference[i],
            size: 30,
            font: "courier",
            color: "black",
            bold: true,
          })
            .center()
            .pos(greenRect[0].x + 260, greenRect[0].y + 10 + pos_1);
        pos_1 = pos_1 + 41;
      }

      console.log(Array);
      S.update();
    }

    const n = 10;
    generateQuestionArray(n);

    const dg = new DrawGraph(51,56, 550,500, "#48BFA9", "#C35648", 1000, 290,totalDay);
    //rect behind graph
    const rectOnGraph =new Rectangle({width:560, height:510, color:"transparent", corner:0}).center().pos(heading_label_X+830,heading_label_Y+0);
    let container_1 =new Container().center();
   
    practiceMode()
    function practiceMode() {
      let cumulativeFrequencyArray = [];
      let cumulativeFrequency = 0;
      let inputPos = 0;
      let correctInputs = 10;
      let buttonArray = [];
      let textAreaArray_1 = [];
      let dragLabelArray=[];
      const lineDawArray=[];
      const circleButtonArray=[];
      let buttonClickCount =0;
    
      // Calculate cumulative frequencies
      for (var i = 0; i < 10; i++) {
        cumulativeFrequency += dayNumber[i];
        cumulativeFrequencyArray.push(cumulativeFrequency);
      }
      console.log(cumulativeFrequencyArray);

      const cumulativeFrequencyFindArray =  getCumulativeFrequency(dayNumber)
    //console.log(cumulativeFrequencyFindArray)
    //find median
    const median = totalDay/2
    let medianFind,valueBeforeMedian,findindex
    for(var i=0;i<cumulativeFrequencyFindArray.length-1;i++){
      if(median<=cumulativeFrequencyFindArray[i]){
        medianFind =cumulativeFrequencyFindArray[i]
        valueBeforeMedian=cumulativeFrequencyFindArray[i-1]
        findindex =i
        break;
      }
    }
    
      // Create TextAreas and Buttons
      for (var i = 0; i < 10; i++) {
        const textArea = new TextArea({
          width: 120,
          height: 30,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "black",
          corner: 10,
        })
          .center()
          .pos(heading_label_X + 650, heading_label_Y + 88 + inputPos);
        textArea.addTo(container_1);
        textAreaArray_1.push(textArea);
    
        const button = new Button({
          label: "",
          width: 15,
          height: 15,
          backgroundColor: "red",
          corner: 8,
        })
          .center()
          .pos(heading_label_X + 780, heading_label_Y + 95 + inputPos)
          .alp(0);
        button.addTo(container_1);
        buttonArray.push(button);
    
        inputPos += 41;
        button.isCorrect = false;
        textArea.on("input", ((index) => {
          return function() {
            const textAreaValue = parseFloat(textArea.text);
            const button = buttonArray[index];
    
            if (textAreaValue === cumulativeFrequencyArray[index]) {
              if (!button.isCorrect) {
                correctInputs++;
                button.isCorrect = true;
              }
              button.alp(1);
              button.backgroundColor = "green";
            } else {
              if (button.isCorrect) {
                correctInputs--;
                button.isCorrect = false;
              }
              button.alp(1);
              button.backgroundColor = "red";
            }
    
            // Check if all inputs are correct
            if (correctInputs === 10) {
              const cumulativeFrequencyFindArray =  getCumulativeFrequency(dayNumber)
              let circlePoint=dg.addPoint({x:firstStep[0],y:cumulativeFrequencyFindArray[0]})
              lineDawArray.push(circlePoint)
              for (var j = 0; j < 10; j++) {
                textAreaArray_1[j].alp(0);
                buttonArray[j].alp(0);
              }
              for (var k = 0; k < 10; k++) {
                const label = new Label({
                  text: cumulativeFrequencyFindArray[k+1],
                  size: 20,
                  font: "courier",
                  color: black,
                  rollColor: black,
                })
                  .center()
                  .pos(heading_label_X + 650, heading_label_Y + 88 + k * 41)
                  .drag();
                label.addTo(container_1);
                S.update();
                dragLabelArray.push(label)

                
                label.on("pressmove", () => {
                  if (label.hitTestBounds(rectOnGraph)) {
                    let labelValueIndex = dragLabelArray.indexOf(label);
                    let p = { x: lastStep[labelValueIndex], y: cumulativeFrequencyFindArray[labelValueIndex + 1] };
                
                    label.animate({
                      props: { alpha: 0 },
                      call: () => {
                        let buttonPoint = dg.addPointOnDrag(p);
                        const { r, button } = buttonPoint;
                        lineDawArray.push(r);
                        console.log(lineDawArray);
                        circleButtonArray.push(button);
                
                        // Store the index within the closure
                        button.on("click", ((index) => {
                          buttonClickCount++
                          return () => {
                            let buttonIndex = index + 1;
                            console.log("Index", buttonIndex);
                            dg.drawLine(lineDawArray[buttonIndex - 1], lineDawArray[buttonIndex]);
                          };
                        })(circleButtonArray.length - 1));

                        if (buttonClickCount === 10) {
                          let addCount =0
                          // Define initial points and lines
                          let p = { x: 0, y: totalDay / 2 };
                          let r = { x: 1100, y: totalDay / 2 };
                          let d = dg.addPoint(p);
                          let e = dg.addPointOnDrag(r);
                          e.button.on("click", () => {
                            addCount++
                              let medianLine = dg.drawLine(d, e.r);
                          });
                      
                          let s = dg.addPoint({ x: 0, y: valueBeforeMedian });
                          let m = dg.addPointOnDrag({ x: 1100, y: valueBeforeMedian });
                          m.button.on("click", () => {
                            addCount++
                              let frequencyCumulative = dg.drawLine(s, m.r);
                          });
                      
                          let l = { x: lastStep[findindex - 1], y: cumulativeFrequencyFindArray[findindex] };
                          let q = dg.addPoint(l);
                          let f = dg.addPointOnDrag({ x: lastStep[findindex - 1], y: 0 });
                          f.button.on("click", () => {
                            addCount++
                              let FrequencyMedian = dg.drawLine(q, f.r);
                          });
                      
                          // Start code from here
                          const result = findMedian(findindex, cumulativeFrequencyFindArray);
                          const { M, L, FC, FM, H, N } = result;
                          let c = { x: M, y: totalDay / 2 };
                          let h = dg.addPoint(c);
                          let v = dg.addPointOnDrag({ x: M, y: 0 });
                      
                          v.button.on("click", () => {
                            addCount++
                              let medianFindLine = dg.drawLine(h, v.r);
                          });

                           // Add final labels
                          if(addCount===4){
                            const multi = '\u00D7';
                            const equationLabel = new Label({
                                text: `M=L+(n/2-Fc)${multi}(h/fm)`,
                                size: 20,
                                font: "courier",
                                color: "black",
                                bold: true,
                            }).center().pos(1010, 820);

                            const textArea =new Rectangle({width:200, height:100, color:blue, corner:20}).center().pos(1010, 850);
                            const button=new Button({
                                              label:label,
                                              width:10,
                                              height:10,
                                              backgroundColor:"transparent",
                                              rollBackgroundColor:"transparent",
                                              gradient:.3,
                                              corner:0
                                          }).center().pos(1010, 1050);
                            textArea.on("input",()=>{
                              const textInputValue=parseFloat(textArea.text)
                              if(M===textInputValue){
                                 button.backgroundColor="green"
                                 button.rollBackgroundColor="green"
                              }else{
                                 button.backgroundColor="red"
                                 button.rollBackgroundColor="red"
                              }
                            })
                          }
                      
                         
                          
                      
                          const valueLabel = new Label({
                              text: `M=${L}+(${totalDay}/2-${FC})${multi}(${H}/${FM})`,
                              size: 20,
                              font: "courier",
                              color: "black",
                              bold: true,
                          }).center().pos(1010, 850);
                      
                          const resultLabel = new Label({
                              text: `M=${M}`,
                              size: 20,
                              font: "courier",
                              color: "black",
                              bold: true,
                          }).center().pos(1010, 890);
                      }
                      
                      }
                    });
                  }
                });
                
                
              }
            }
          };
        })(i));
      }
    }
    
    





    ///load  Play button
    const playButton = new Button({
      label: "",
      width: 100,
      height: 100,
      backgroundColor: "transparent",
      rollBackgroundColor: "transparent",
      borderWidth: 0,
      gradient: 0.3,
      corner: 10,
    })
      .center()
      .sca(.8)
      .pos(1670, 970).alp(0);

    const playImage = new Pic("assets/images/play_button.png").center(
      playButton
    );
    let container = new Container().center()
    var FcPos = 0;
    var cumulativeFrequency = 0;
     var cumulativeFrequencyArray=[]
    var cumulativeFrequencyFlag = 0;
    let FcLabel;
    const circlePosArray=[]
    playButton.on("click", () => {
    const cumulativeFrequencyFindArray =  getCumulativeFrequency(dayNumber)
    //console.log(cumulativeFrequencyFindArray)
    //find median
    const median = totalDay/2
    let medianFind,valueBeforeMedian,index
    for(var i=0;i<cumulativeFrequencyFindArray.length-1;i++){
      if(median<=cumulativeFrequencyFindArray[i]){
        medianFind =cumulativeFrequencyFindArray[i]
        valueBeforeMedian=cumulativeFrequencyFindArray[i-1]
        index =i
        break;
      }
    }
   // console.log(index,"=",medianFind)


      const animateFcLabel = (i) => {
        if (i >= 10) {
          return;
        }
        findCumulativeFrequency(i)

        
    
        FcLabel.addTo(container);
    
        FcLabel.animate({
          props: { alpha: 1 },
          time: .2,
          call: () => {
            if(i!==0){
              FcLabel.alp(0)
              FcLabel.text=cumulativeFrequency
              FcLabel.animate({
                props: { alpha: 1 },
                time: .2,
                call:()=>{
                  FcPos = FcPos + 41;
                  let p ={x:lastStep[i],y:cumulativeFrequencyFindArray[i+1]}
                  let q=dg.addPoint(p)
                  circlePosArray.push(q)
                  animateFcLabel(i + 1);
                  if(i===9){
                    drawLine(medianFind,valueBeforeMedian,index,cumulativeFrequencyFindArray)
                  }
                }
              })
            }else{
              FcPos = FcPos + 41;
              animateFcLabel(i + 1);
              
              let circlePoint=dg.addPoint({x:firstStep[i],y:cumulativeFrequencyFindArray[i]})
              circlePosArray.push(circlePoint)
              let p ={x:lastStep[i],y:cumulativeFrequencyFindArray[i+1]}
              circlePoint=dg.addPoint(p)
              circlePosArray.push(circlePoint)
            }
            
            
          },
        });
      };
    
      animateFcLabel(0);
      console.log("circlePosArray",circlePosArray)
    });

    function drawLine(x1,y1,findIndex,arr) {
      let shapeArray = [];
    
      for (var j = 1; j <= 10; j++) {
        const shape = dg.drawLine(circlePosArray[j - 1], circlePosArray[j]);
        shape.alpha = 0; 
        shapeArray.push(shape);
      }
    
      function animateShape(index) {
        if (index < shapeArray.length) {
          shapeArray[index].animate({
            props: { alpha: 1 },
            time: 0.5,
            ease:"quadIn",
            call: () =>{
              animateShape(index + 1);
            }
          });
        }else{
          let p = { x: 0, y: totalDay / 2 };
          let r = { x: 1100, y: totalDay / 2 };
          let d = dg.addPoint(p,1);
          let e = dg.addPoint(r);
          let medianLine=dg.drawLine(d, e);
          medianLine.alpha=0

          let s = dg.addPoint({ x: 0, y: y1 },1);
          let m = dg.addPoint({ x: 1100, y: y1 });
          let frequencyCumulative=dg.drawLine(s, m);
          frequencyCumulative.alpha=0

          let l = { x: lastStep[findIndex - 1], y: arr[findIndex] };
          let q = dg.addPoint(l);
          let f = dg.addPoint({ x: lastStep[findIndex - 1], y: 0 },2);
          let FrequencyMedian=dg.drawLine(q, f);
          FrequencyMedian.alpha=0

         /////start code  from here..........
          const result= findMedian(findIndex,arr)
          const {M,L,FC,FM,H,N}=result
          let c = { x: M, y: totalDay/2};
          let h = dg.addPoint(c);
          let v = dg.addPoint({ x: M, y: 0 });
          let medianFindLine=dg.drawLine(h, v);
          medianFindLine.alpha=0

          ///add final labels
          const multi = '\u00D7'
          const equationLabel =new Label({
            text:`M=L+(n/2-Fc)${multi}(h/fm)`,
            size: 20,
            font: "courier",
            color: "black",
            bold: true,
          })
            .center()
            .pos(1010,820).alp(0);

            const valueLabel =new Label({
              text:`M=${L}+(${totalDay}/2-${FC})${multi}(${H}/${FM})`,
              size: 20,
              font: "courier",
              color: "black",
              bold: true,
            })
              .center()
              .pos(1010,850).alp(0);

            const resultLabel =new Label({
              text:`M=${ M}`,
              size: 20,
              font: "courier",
              color: "black",
              bold: true,
            })
              .center()
              .pos(1010,890).alp(0);
          const lines =[medianLine,frequencyCumulative,FrequencyMedian,medianFindLine,equationLabel,valueLabel,resultLabel]

          function animateLines(lineIndex){
            if(lineIndex>lines.length-1){
              return
            }
             lines[lineIndex].animate({
              props:{alpha:1},
              time:.7,
              call:()=>{
                lineIndex++
                animateLines(lineIndex)
              }
             })
          }
          animateLines(0)

        }
      }
      animateShape(0);
    }

    ///find median
    function findMedian(index,arr){
     let L =firstStep[index-1]

     let N =totalDay/2
     let FC = arr[index-1]
     let FM=dayNumber[index-1]
     let H =lastStep[0]-firstStep[0]
     const M =Math.round(L + ((N-FC)*(H/FM)),2)

      return {M,L,FC,FM,H,N}
    }
    
    function findCumulativeFrequency(i){
      if (i === 0) {
        cumulativeFrequency = cumulativeFrequency + dayNumber[i];
        cumulativeFrequencyArray.push(cumulativeFrequency)
        FcLabel = new Label({
          text: dayNumber[i],
          size: 30,
          font: "courier",
          color: "black",
          bold: true,
        })
          .center()
          .pos(greenRect[0].x + 450, greenRect[0].y + 10 + FcPos)
          .alp(0);
      } else {
        cumulativeFrequencyFlag = cumulativeFrequency;
        cumulativeFrequency = cumulativeFrequency + dayNumber[i];
        cumulativeFrequencyArray.push(cumulativeFrequency)
  
        FcLabel = new Label({
          text: `${cumulativeFrequencyFlag}+${dayNumber[i]}`,
          size: 30,
          font: "courier",
          color: "black",
          bold: true,
        })
          .center()
          .pos(greenRect[0].x + 450, greenRect[0].y + 10 + FcPos)
          .alp(0);
      }
    }

    let ModeSliderValue;

    const modeSlider = new Slider({
      step: 1,
      vertical: true,
      min: 1,
      max: 2,
      useTicks: true,
      button: "circle",
      barColor: "transparent",
      tickColor: "black",
    })
      .center()
      .pos(1670, 224)
      .sca(0.7)
      .change(() => {
        ModeSliderValue = modeSlider.currentValue;

        if (ModeSliderValue === 2) {
          playButton.alp(0);
          container_1.vis(true)
          container.vis(false)
          console.log(ModeSliderValue);
        } else if (ModeSliderValue === 1) {
          playButton.alp(1);
          container_1.vis(false)
          container.vis(true)
          modeSlider.enabled = true;
          console.log(ModeSliderValue);
        }
      });

    new Label({
      text: "practice \n\n\n\n\n\n\n\n\n\n\n\n\nauto",
      size: 22,
      font: "courier",
      color: black,
      bold: true,
    })
      .center()
      .pos(1720, 233);

    const restartButton = new Button({
      label: "",
      width: 90,
      height: 90,
      backgroundColor: "transparent",
      rollBackgroundColor: "limegreen",
      borderWidth: 0,
      gradient: 0.4,
      corner: 50,
    })
      .center()
      .mov(860, 470);

    const pic = new Pic("assets/images/reset_button.png")
      .sca(0.9)
      .center(restartButton)
      .mov(10, 0);

    restartButton.on("click", () => {
      location.reload();
    });

    
    

S.update();
    
  });
}
init();

