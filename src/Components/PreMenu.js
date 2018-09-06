import React from 'react';

import Avatar from 'material-ui/Avatar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import CompanyLogo from '../img/logo.png';
import Userpic from '../img/Profile_Img.png';

// import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

// import GoogleTranslate from '../Components/GoogleTranslate';

import {Flex} from 'react-flex-material';

// axios call 

import axios from 'axios';


import PowerSetting from 'material-ui/svg-icons/action/power-settings-new';
import ListItem from 'material-ui/List/ListItem';

//Redux Data
import {connect} from 'react-redux';
import * as Action from '../Store/Action';



const iconStyles = {
    marginRight: 24,
};

var nameresult;
var emailresult;


class MenuAlumno extends React.Component {

    constructor(props) {
        super(props);
        this.state = { open: false, imagePreviewUrl: Userpic,imageStateCall:false,FileName:"" };
        this.handleLoadProfileImage(this);
    }

    

    handleToggle = () => this.setState({ open: !this.state.open });
    handleClose = () => this.setState({ open: false });

    componentDidMount () {        
        this.handleLoadProfileImage(this);       
        // var adddivElement = document.createElement('div');
        // adddivElement.setAttribute("id","google_translate_element") ;
        // var addScript = document.createElement('script');
        // addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=window.googleTranslateElementInit');        
        // document.body.appendChild(addScript);  
        // document.body.appendChild(adddivElement);
       //window.gpaTranslate();


       // window.googleTranslateElementInit(); 
          
    }

    // componentWillMount () {               
    //     window.googleTranslateElementInit();           
    // }

    UploadProfileImage()
    {        
        if(this.state.imageStateCall==true)
        {        
        // Profile Image Upload API 
        let EmpProfileAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
        let EmpProfileJSONData = JSON.stringify({
        QueryName: "Upload",
        EmailState: emailresult,
        FileName: this.state.FileName,
        EmployeeImg: this.state.imagePreviewUrl[1]
        });        
        let AxiosHeaderConfig = {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "Access-Control-Request-Method": "*",
            }
        };
        axios({
            method: "POST",
            url: EmpProfileAPIUrl,
            data: EmpProfileJSONData,
            //headers:AxiosHeaderConfig,

        }).then((data) => {
            alert("Your Profile Image Saved Successfully");   

        }).catch((err) => {
            
        })
    }
    }

    handleLoadProfileImage(e)
    {    
        nameresult = localStorage.getItem('applicant_name'); 
        emailresult = localStorage.getItem('applicant_email');   
        let LoadProfileImageAPIUrl = "https://48q6lrdip0.execute-api.us-west-2.amazonaws.com/Dev/GPA_EmployeeDatas_Lambda";
        let JSONData=JSON.stringify(
            {
                QueryName:"ReadLogo",
                EmailState: emailresult        
         }
        );
        let AxiosHeaderConfig = {
            "Content-Type": "application/json",
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
        }
        axios({
            method: "POST",
            data:JSONData,
            url: LoadProfileImageAPIUrl,
            headers:AxiosHeaderConfig,
        }).then(({data}) => {   
             var thisObj = this;
             data.map((item,key)=>{                
                thisObj.setState({ imagePreviewUrl: item.EmployeeImg});
                thisObj.setState({imageStateCall:true});
             })            
        }).catch((err) => {
           
        })
    }

    handleClick(e)
    {
        this.refs.fileUploader.click(); 
    }

    handleImageChange(e){
        var file = e.target.files[0];
        let reader = new FileReader();      
        reader.onloadend = () => {
            let read = reader.result;            
            let fileinputdata = read.split(',');
           // let Extension = file.name.match(/\.[0-9a-z]+$/i);               
            this.setState({
                file: file,              
                FileName: file.name,
                imagePreviewUrl: fileinputdata,
                //FileExtension: file.name.split('.').pop(),
                imageStateCall: true,


            });
            this.UploadProfileImage();             
        }
        
        reader.readAsDataURL(file);        
    }    

    /*Google Translater*/
    googleTranslateElementInit() {
        new window.google.translate.TranslateElement({
          // here is where you change the language
          pageLanguage: '',includedLanguages: 'de,en,es,fr,it,ja,ko,nl,no,pt,zh-CN',defaultLanguage: 'en', multilanguagePage: true
        }, 'google_translate_element_premenu');
      }

      componentDidMount() { 
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '/language.js?cb=googleTranslateElementInit');
        document.body.appendChild(addScript);  
        window.googleTranslateElementInit = this.googleTranslateElementInit;
      }

    render() {
        return (
            <div>
                <Flex layout="row" className="topheader">
                   

                        <Flex flex="none">
                           
                                <img src={CompanyLogo} alt="Company Logo" width="130" height="57" className="CompanyIcons1" />
                         
                        </Flex>                    

                        <Flex flex layout align="end center">
                            
                            <Flex flex="none">
                                <div id="google_translate_element_premenu"></div> 
                                {/* <GoogleTranslate /> */}
                            </Flex>
                                <Flex flex="none" id="UserSettings">
                                <ListItem
                                    className="userprof"
                                    disabled={true}
                                    leftAvatar={
                                        <Avatar src={(this.state.imageStateCall!=false)?this.state.imagePreviewUrl:Userpic} onClick={this.handleClick.bind(this)} />
                                    } >
                                    <span className="UserProfilename">{nameresult}</span><br/>
                                    <div class="usermail">{emailresult}</div>
                                </ListItem>
                            </Flex>

                            <input type="file" id="file" ref="fileUploader" style={{display: "none"}} onChange={this.handleImageChange.bind(this)}/>

                            <Flex flex="none" >
                                <IconMenu className="UsersettingsIcons"
                                    iconButtonElement={
                                    <IconButton touch={true}>
                                        <NavigationExpandMoreIcon />
                                    </IconButton>
                                    }>
                                    <a href='/Login' className="remove-underline"> <MenuItem primaryText="Logout" leftIcon={<PowerSetting />}/></a>
                                </IconMenu>
                            </Flex>
                        </Flex>

                   
                </Flex>
                {/* </Grid> */}               
            </div>
        );
    }
}

/// react redux
const mapReducerStateToProps = (state)=>{
    return{
        LoginData:state.Login_Reducer,
        UserData:state.User_Reducer,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        setUserID:(PLUserID)=>{
            dispatch(Action.setUserID(PLUserID));
        },
        setPassword:(PLPassword)=>{
            dispatch(Action.setPassword(PLPassword));
        },
        setUserName:(PUserName)=>{
            dispatch(Action.setUserName(PUserName));
        },
        setCCompanyID:(PCCompanyID)=>{
            dispatch(Action.setCCompanyID(PCCompanyID));
        },
        setUTCStatus:(PUTCStatus)=>{
            dispatch(Action.setUTCStatus(PUTCStatus));
        }       
    }
}

export default connect(mapReducerStateToProps,mapDispatchToProps)(MenuAlumno);