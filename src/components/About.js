import React, { Component } from "react";
import { Icon } from "@iconify/react";
import csharp from "@iconify/icons-logos/c-sharp";
import php from "@iconify/icons-logos/php";
import javascript from "@iconify/icons-logos/javascript";

class About extends Component {
  render() {
    let profilePicture = ""
    if (this.props.sharedBasicInfo) {
      profilePicture = "images/" + this.props.sharedBasicInfo.image;
    }
    return (
      <section id="about">
        <div className="col-md-12">
          <div className="row center mx-auto mb-5">
            <div className="col-md-4 mb-5 center">
              <div className="polaroid">
                <span style={{ cursor: "auto" }}>
                  <img
                    height="250px"
                    src={profilePicture}
                    alt="Avatar placeholder"
                  />
                  <Icon
                    icon={csharp}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                  <Icon
                    icon={javascript}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                  <Icon
                    icon={php}
                    style={{ fontSize: "400%", margin: "9% 5% 0 5%" }}
                  />
                </span>
              </div>
            </div>

            <div className="col-md-8">
              <div className="col-md-10">
                <div className="card">
                  <div className="card-header">
                    <span
                      className="iconify"
                      data-icon="emojione:red-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:yellow-circle"
                      data-inline="false"
                    ></span>{" "}
                    &nbsp;{" "}
                    <span
                      className="iconify"
                      data-icon="twemoji:green-circle"
                      data-inline="false"
                    ></span>
                  </div>
                  <div
                    className="card-body font-trebuchet text-justify ml-3 mr-3"
                    style={{
                      height: "auto",
                      fontSize: "132%",
                      lineHeight: "200%",
                    }}
                  >
                    <br />
                    <div className="wave">
                      Hello 👋, I am Siddharth
                    </div>
                    I am a Senior Full Stack Engineer who loves to explore new tech. In enjoy driving my car to new destinations (already done about 40K Kms since 2 years).
                    I am good at,
                    <ul>
                      <li>Building and developing microservices based scalable systems that are built on React, C#, PHP, NodeJS and on cloud that can handle lakhs of hits per hour. </li>
                      <li>Very well versed with CI/CD, AWS, Azure and Google Cloud</li>
                      <li>Leading an engineering team of 5+ members by being captain of the team rather than being a manager, motivating them and getting the task done on right time using agile Methodologies.</li>
                      <li>Architecting the system from scratch and trying to be the bridge between management solutions and technical solutions.</li>
                      <li>8+ Years of Experience in Developing Applications using React, C#, LAMP Stack and using using Popular frameworks like Yii, Zend, CodeIgniter, Entity Framework etc.</li>
                      <li>2+ Year Experience in Mobile application Development on Andriod.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
