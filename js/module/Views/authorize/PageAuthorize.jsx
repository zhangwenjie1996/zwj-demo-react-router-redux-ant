import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from "antd";
import { XOperateButton, XIntlProvider } from "../../../component";
import NorthCenter from "../../../layout/latest-northcenter";
import Request from "../../../util/ajax";
import $ from "jquery";
import moment from "moment";

export default class PageAuthorize extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NorthCenter>
        <div style={{ width: 600, margin: "auto" }}>
          <Carousel autoplay>
            <div>
              <img
                src="http://7viirv.com1.z0.glb.clouddn.com/ewfsew.jpg"
                style={{ width: 600 }}
              />
            </div>
            <div>
              <img
                src="http://7viirv.com1.z0.glb.clouddn.com/dsfwes.jpg"
                style={{ width: 600 }}
              />
            </div>
            <div>
              <img
                src="http://7viirv.com1.z0.glb.clouddn.com/11249174041b6a5edfo.jpg"
                style={{ width: 600 }}
              />
            </div>
          </Carousel>
        </div>

        <div />
      </NorthCenter>
    );
  }
}
