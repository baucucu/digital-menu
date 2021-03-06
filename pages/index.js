import React from "react";
import fetch from "isomorphic-unfetch";
import MenuData from '../static/meniu.js';

import Menu from "../components/Menu";

export default class Index extends React.Component {
  static async getInitialProps() {
    const url =
      "https://api-euwest.graphcms.com/v1/cjjrhurmx057h01buasfnr6sl/master";
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        {
          categories {
            name
            subcategories {
              name
              menuItems {
                description
                price
              }
            }
          }
        }
        `
      })
    };
    
    const { data } = await fetch(url, options).then(res => res.json());
    return { data };
  }
  render() {
    return (
      <React.Fragment>
        <Menu data={this.props.data} />
        {/* <Menu data={MenuData} /> */}
        <style global jsx>{`
          html,
          body {
            padding: 0;
            margin: 0;
          }
          * {
            box-sizing: border-box;
          }
          img {
            float: right;
            margin-right: 10px;
            cursor: pointer;
          }
        `}</style>
      </React.Fragment>
    );
  }
}
