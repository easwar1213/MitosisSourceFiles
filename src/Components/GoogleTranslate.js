import React, { Component } from 'react';
class GoogleTranslate extends Component {
     googleTranslateElementInit() {
        new window.google.translate.TranslateElement({
          // here is where you change the language
          pageLanguage: 'en'
        }, 'google_translate_element');
      }

      componentDidMount() { 
        var addScript = document.createElement('script');
        addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');        
        document.body.appendChild(addScript);  
        window.googleTranslateElementInit = this.googleTranslateElementInit;
      }

    render() {
        return (                 
            <div id="google_translate_element">
            {/* <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>       */}
            </div>
          );
        }
}

export default GoogleTranslate;