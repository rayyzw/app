import React from 'react';
import Svg, {
  Text,
  Line,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Path,
  G,
  Circle
} from 'react-native-svg';

export function BarChart(props){
  let {data, interval, height, width} = props;
  let leftWidth = 25;
  let bottomHeight = 20;
  let xInterval = (width-leftWidth)/data.length;

  if(!interval){
    interval = 0;
  }

  if(!height){
    height = 150;
  }
  
  let positiveHeight = height-bottomHeight;
  
  data.map((d)=>{
    d.values.map((v)=>{      
      if(v<0){
        positiveHeight = (height-bottomHeight)/2;
      }
      if(interval < Math.abs(v)){
        interval = Math.abs(v);
      }
    });
  });

  return (
    <Svg width={width} height={height}>            
      <Defs>
        <LinearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#2196f3" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg0" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FF0000" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#0000FF" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#00FF00" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg3" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#888800" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg4" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#008888" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg5" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#880088" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <G transform={`translate(0 ${(positiveHeight/5) * 0})`}>
        <Path fill="teal" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="teal" d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 1})`}>
        <Path fill="green" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="green" d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 2})`}>
        <Path fill="olive" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="olive" d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 3})`}>
        <Path fill="red" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="red" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 4})`}>
        <Path fill="maroon" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="maroon" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z"/>
      </G>
      {data && data.map((d,i)=>(
        <>
        <Text key={i} fill="blue" fontSize={14} x={leftWidth + i*xInterval} y={positiveHeight+15} transform={`rotate(0 ${i*xInterval} ${positiveHeight+15})`}>{d.label}</Text>
        {d.values && d.values.map((v,iv)=>(          
          <Rect
            key={iv}
            x={leftWidth + i*xInterval + iv*5}
            y={positiveHeight * (1 - (Math.abs(v/interval) + v/interval)/2)}
            width={3*6/d.values.length}
            height={Math.abs(v/interval) * positiveHeight}
            fill={d.values.length>1?`url(#lg${iv%6})`:`url(#lg)`}
            strokeWidth="0"
            stroke="#FFFFFF"
          />
        ))}
        </>
      ))}
      <Line x1={leftWidth} y1={positiveHeight} x2={width} y2={positiveHeight} stroke="#888888" strokeWidth="1" />      
    </Svg>
  );
}

export function PieChart(props){
  let {data, circleR} = props;
  let colors = ["#FF0000","#0000FF","#00FF00","#888800","#008888","#880088"];

  if(!circleR){
    circleR = 50;
  }
  
  let total = 0;
  data.map((d)=>{
    total = total + d.value;
  });
  
  data.map((d,i)=>{
    let sum = 0;
    for(let j=0; j<i; j++){
      sum = sum + data[j].value;
    }
    d.rotate = sum  * 360 / total;
  });

  return (
    <Svg width={circleR * 4 + 200} height={circleR * 4 + 80}>
      {data.map((d,i)=>(
        <>
        <Circle 
          r={circleR} 
          cx={circleR * 2} 
          cy={circleR * 2} 
          fill="#FFFFFF"
          fillOpacity={0}
          stroke={colors[i%6]}
          strokeWidth={circleR * 2}
          strokeDasharray={`${d.value * 3.14 * circleR * 2 / total} ${3.14 * circleR * 2}`}
          transform={`rotate(${d.rotate} ${circleR * 2} ${circleR * 2})`}
        />
        <Text fill={colors[i%6]} y={20 + i*20} x={circleR * 4 + 20}>{d.label} {(d.value * 100 / total).toFixed()}%</Text>
        </>
      ))}
    </Svg>
  );
}

export function LineChart(props){
  let {data, interval, height, width} = props;
  let leftWidth = 25;
  let bottomHeight = 20;
  let xInterval = (width-leftWidth)/data.length;

  if(!interval){
    interval = 0;
  }

  if(!height){
    height = 150;
  }
  
  let positiveHeight = height-bottomHeight;
  
  data.map((d)=>{
    d.values.map((v)=>{      
      if(v<0){
        positiveHeight = (height-bottomHeight)/2;
      }
      if(interval < Math.abs(v)){
        interval = Math.abs(v);
      }
    });
  });

  return (
    <Svg width={width} height={height}>            
      <Defs>
        <LinearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#2196f3" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg0" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FF0000" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#0000FF" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#00FF00" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg3" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#888800" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg4" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#008888" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
        <LinearGradient id="lg5" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#880088" stopOpacity="1" />
          <Stop offset="1" stopColor="#888888" stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <G transform={`translate(0 ${(positiveHeight/5) * 0})`}>
        <Path fill="teal" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="teal" d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 1})`}>
        <Path fill="green" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="green" d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 2})`}>
        <Path fill="olive" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="olive" d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 3})`}>
        <Path fill="red" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="red" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
      </G>
      <G transform={`translate(0 ${(positiveHeight/5) * 4})`}>
        <Path fill="maroon" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <Path fill="maroon" d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zm6.991-8.38a.5.5 0 1 1 .448.894l-1.009.504c.176.27.285.64.285 1.049 0 .828-.448 1.5-1 1.5s-1-.672-1-1.5c0-.247.04-.48.11-.686a.502.502 0 0 1 .166-.761l2-1zm-6.552 0a.5.5 0 0 0-.448.894l1.009.504A1.94 1.94 0 0 0 5 6.5C5 7.328 5.448 8 6 8s1-.672 1-1.5c0-.247-.04-.48-.11-.686a.502.502 0 0 0-.166-.761l-2-1z"/>
      </G>
      {data && data.map((d,i)=>(
        <>
        <Text fill="blue" fontSize={14} x={leftWidth + i*xInterval} y={positiveHeight+15} transform={`rotate(0 ${i*xInterval} ${positiveHeight+15})`}>{d.label}</Text>
        {/* {i===0 && d.values && d.values.map((v,iv)=>(          
          <Line
            key={iv}
            x1={leftWidth}
            y1={positiveHeight}
            x2={leftWidth + i*xInterval + iv*5 + xInterval/2}
            y2={positiveHeight * (1 - (Math.abs(v/interval) + v/interval)/2)}
            strokeWidth="1"
            stroke="#2196f3"
          />
        ))} */}
        {i>0 && d.values && d.values.map((v,iv)=>(          
          <Line
            key={iv}
            x1={leftWidth + (i-1)*xInterval + iv*5 + xInterval/2}
            y1={positiveHeight * (1 - (Math.abs((data[i-1].values[iv])/interval) + (data[i-1].values[iv])/interval)/2)}
            x2={leftWidth + i*xInterval + iv*5 + xInterval/2}
            y2={positiveHeight * (1 - (Math.abs(v/interval) + v/interval)/2)}
            strokeWidth="1"
            stroke="#2196f3"
          />
        ))}
        {/* {i===(data.length-1) && d.values && d.values.map((v,iv)=>(          
          <Line
            key={iv}
            x1={leftWidth + (i+1)*xInterval + iv*5}
            y1={positiveHeight}
            x2={leftWidth + i*xInterval + iv*5 + xInterval/2}
            y2={positiveHeight * (1 - (Math.abs(v/interval) + v/interval)/2)}
            strokeWidth="1"
            stroke="#2196f3"
          />
        ))} */}
        </>
      ))}
      <Line x1={leftWidth} y1={positiveHeight} x2={width} y2={positiveHeight} stroke="#888888" strokeWidth="1" />      
    </Svg>
  );
}