(this["webpackJsonpreact-frontend-dev-portfolio"]=this["webpackJsonpreact-frontend-dev-portfolio"]||[]).push([[0],{16:function(e,a,t){e.exports=t(30)},21:function(e,a,t){},22:function(e,a,t){},30:function(e,a,t){"use strict";t.r(a);var n=t(0),i=t.n(n),r=t(12),c=t.n(r),l=(t(21),t(1)),s=t(2),o=t(4),m=t(3),d=t(8),u=t.n(d),h=(t(22),function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){if(this.props.sharedBasicInfo)var e=this.props.sharedBasicInfo.social.map((function(e){return i.a.createElement("span",{key:e.name,className:"m-4"},i.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},i.a.createElement("i",{className:e.class})))}));return i.a.createElement("footer",null,i.a.createElement("div",{className:"col-md-12"},i.a.createElement("div",{className:"social-links"},e),i.a.createElement("div",{className:"copyright py-4 text-center"},i.a.createElement("div",{className:"container"},i.a.createElement("small",null,"Copyright \xa9"," ",this.props.sharedBasicInfo?this.props.sharedBasicInfo.name:"???")))))}}]),t}(n.Component)),f=t(6),p=t(13),g=t.n(p),E=t(14),v=t.n(E),y=t(15),b=t.n(y),k=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){var e="";return this.props.sharedBasicInfo&&(e="images/"+this.props.sharedBasicInfo.image),i.a.createElement("section",{id:"about"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("div",{className:"row center mx-auto mb-5"},i.a.createElement("div",{className:"col-md-4 mb-5 center"},i.a.createElement("div",{className:"polaroid"},i.a.createElement("span",{style:{cursor:"auto"}},i.a.createElement("img",{height:"250px",src:e,alt:"Avatar placeholder"}),i.a.createElement(f.Icon,{icon:g.a,style:{fontSize:"400%",margin:"9% 5% 0 5%"}}),i.a.createElement(f.Icon,{icon:b.a,style:{fontSize:"400%",margin:"9% 5% 0 5%"}}),i.a.createElement(f.Icon,{icon:v.a,style:{fontSize:"400%",margin:"9% 5% 0 5%"}})))),i.a.createElement("div",{className:"col-md-8"},i.a.createElement("div",{className:"col-md-10"},i.a.createElement("div",{className:"card"},i.a.createElement("div",{className:"card-header"},i.a.createElement("span",{className:"iconify","data-icon":"emojione:red-circle","data-inline":"false"})," ","\xa0"," ",i.a.createElement("span",{className:"iconify","data-icon":"twemoji:yellow-circle","data-inline":"false"})," ","\xa0"," ",i.a.createElement("span",{className:"iconify","data-icon":"twemoji:green-circle","data-inline":"false"})),i.a.createElement("div",{className:"card-body font-trebuchet text-justify ml-3 mr-3",style:{height:"auto",fontSize:"132%",lineHeight:"200%"}},i.a.createElement("br",null),i.a.createElement("div",{className:"wave"},"Hola \ud83d\udc4b, I am Siddharth"),"I am a Senior Full Stack Engineer who loves to explore new tech. In enjoy driving my car to new destinations (Already done about 40K Kms since 2 years) I am good at,",i.a.createElement("ul",null,i.a.createElement("li",null,"Building and developing microservices based scalable systems that are built on React, C#, PHP, NodeJS and on cloud that can handle lakhs of hits per hour. "),i.a.createElement("li",null,"Very well versed with CI/CD, AWS, Azure and Google Cloud"),i.a.createElement("li",null,"Leading an engineering team of 5+ members by being captain of the team rather than being a manager, motivating them and getting the task done on right time using agile Methodologies."),i.a.createElement("li",null,"Architecting the system from scratch and trying to be the bridge between management solutions and technical solutions."),i.a.createElement("li",null,"8+ Years of Experience in Developing Applications using React, C#, LAMP Stack and using using Popular frameworks like Yii, Zend, CodeIgniter, Entity Framework etc."),i.a.createElement("li",null,"2+ Year Experience in Mobile application Development on Andriod.")))))))))}}]),t}(n.Component),w=t(7),N=(t(28),t(9)),x=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){if(this.props.resumeExperience&&this.props.resumeBasicInfo)var e=this.props.resumeBasicInfo.section_name.experience,a=this.props.resumeExperience.map((function(e,a){var t=e.technologies,n=e.mainTech.map((function(e,a){return i.a.createElement(N.a,{pill:!0,className:"main-badge mr-2 mb-2",key:a},e)})),r=t.map((function(e,a){return i.a.createElement(N.a,{pill:!0,className:"experience-badge mr-2 mb-2",key:a},e)}));return i.a.createElement(w.VerticalTimelineElement,{className:"vertical-timeline-element--work",date:e.years,iconStyle:{background:"#AE944F",color:"#fff",textAlign:"center"},icon:i.a.createElement("i",{className:"fa fa-code experience-icon"}),key:a},i.a.createElement("div",{style:{textAlign:"left",marginBottom:"4px"}},n),i.a.createElement("h3",{className:"vertical-timeline-element-title",style:{textAlign:"left"}},e.title),i.a.createElement("h4",{className:"vertical-timeline-element-subtitle",style:{textAlign:"left"}},e.company),i.a.createElement("div",{style:{textAlign:"left",marginTop:"15px"}},r))}));return i.a.createElement("section",{id:"resume",className:"pb-5"},i.a.createElement("div",{className:"col-md-12 mx-auto"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("h1",{className:"section-title",style:{color:"black"}},i.a.createElement("span",{className:"text-black",style:{textAlign:"center"}},e)))),i.a.createElement("div",{className:"col-md-8 mx-auto"},i.a.createElement(w.VerticalTimeline,null,a,i.a.createElement(w.VerticalTimelineElement,{iconStyle:{background:"#AE944F",color:"#fff",textAlign:"center"},icon:i.a.createElement("i",{className:"fa fa-hourglass experience-icon"})}))))}}]),t}(n.Component),j=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(s.a)(t,[{key:"render",value:function(){if(this.props.sharedSkills&&this.props.resumeBasicInfo)var e=this.props.resumeBasicInfo.section_name.skills,a=this.props.sharedSkills.icons.map((function(e,a){return i.a.createElement("li",{className:"list-inline-item mx-3",key:a},i.a.createElement("span",null,i.a.createElement("div",{className:"text-center skills-tile"},i.a.createElement("i",{className:e.class,style:{fontSize:"220%"}},i.a.createElement("p",{className:"text-center",style:{fontSize:"30%",marginTop:"4px"}},e.name)))))}));return i.a.createElement("section",{id:"skills"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("div",{className:"col-md-12"},i.a.createElement("h1",{className:"section-title"},i.a.createElement("span",{className:"text-white"},e))),i.a.createElement("div",{className:"col-md-12 text-center"},i.a.createElement("ul",{className:"list-inline mx-auto skill-icon"},a))))}}]),t}(n.Component),I=function(e){Object(o.a)(t,e);var a=Object(m.a)(t);function t(e){var n;return Object(l.a)(this,t),(n=a.call(this)).state={resumeData:{},sharedData:{}},n}return Object(s.a)(t,[{key:"applyPickedLanguage",value:function(){this.loadResumeFromPath("en.json")}},{key:"componentDidMount",value:function(){this.loadSharedData(),this.applyPickedLanguage()}},{key:"loadResumeFromPath",value:function(e){u.a.ajax({url:e,dataType:"json",cache:!1,success:function(e){this.setState({resumeData:e})}.bind(this),error:function(e,a,t){alert(t)}})}},{key:"loadSharedData",value:function(){u.a.ajax({url:"portfolio.json",dataType:"json",cache:!1,success:function(e){this.setState({sharedData:e}),document.title="".concat(this.state.sharedData.basic_info.name)}.bind(this),error:function(e,a,t){alert(t)}})}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(k,{resumeBasicInfo:this.state.resumeData.basic_info,sharedBasicInfo:this.state.sharedData.basic_info}),i.a.createElement(j,{sharedSkills:this.state.sharedData.skills,resumeBasicInfo:this.state.resumeData.basic_info}),i.a.createElement(x,{resumeExperience:this.state.resumeData.experience,resumeBasicInfo:this.state.resumeData.basic_info}),i.a.createElement(h,{sharedBasicInfo:this.state.sharedData.basic_info}))}}]),t}(n.Component),S=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function A(e,a){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),a&&a.onUpdate&&a.onUpdate(e)):(console.log("Content is cached for offline use."),a&&a.onSuccess&&a.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}t(29);window.$primaryLanguage="en",window.$secondaryLanguage="pl",window.$primaryLanguageIconId="primary-lang-icon",window.$secondaryLanguageIconId="secondary-lang-icon",c.a.render(i.a.createElement(I,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var a="".concat("","/service-worker.js");S?(!function(e,a){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var n=t.headers.get("content-type");404===t.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):A(e,a)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(a,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):A(a,e)}))}}()}},[[16,1,2]]]);
//# sourceMappingURL=main.a14911bd.chunk.js.map