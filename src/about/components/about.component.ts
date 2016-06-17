import {Component, ViewEncapsulation } from 'angular2/core';
import * as c3 from 'c3';

@Component({
  selector: 'sd-about',
  moduleId: module.id,
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent {

  private usageData:Object;

constructor() {

  this.usageData = {
      'Used': 67,
      'Remaining': 33
  };

}

ngOnInit(){

  var chart = c3.generate({
      data: {
          columns: Object.keys(this.usageData).map((key)=>{
            return [key, this.usageData[key]];
          }),
          type : 'pie',
          order: null,
          colors: {
            'Used': '#F6C600',
            'Remaining': '#A4A4A4'
          }
      },
      bindto: '#chart',
      pie: {
          title: this.usageData['Used'].toFixed(1),
          width: 22,
          label: {
            show: false
          }
      },
      size: {
        width: 250
      },
      legend: {
        show: true
      }
    });

    var gauge = c3.generate({
      data: {
          columns: [
              ['data', 89]
          ],
          type: 'gauge',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      },
      bindto: '#gauge',
      gauge: {
         label: {
             format: function(value, ratio) {
                 return value;
             },
             show: false // to turn off the min/max labels.
         },
     min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
     max: 100, // 100 is default
     units: ' %',
     width: 39 // for adjusting arc thickness
      },
      color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
          threshold: {
  //            unit: 'value', // percentage is default
  //            max: 200, // 100 is default
              values: [30, 60, 90, 100]
          }
      },
      size: {
          height: 180
      }

  });

  let label = d3.select('text.c3-chart-arcs-title');
  let labelSubtext = "GB / of " + (this.usageData['Remaining']+this.usageData['Used']) + "GB";
  label.append('tspan').text(labelSubtext).attr('dy', 50).attr('x', 0);
}
