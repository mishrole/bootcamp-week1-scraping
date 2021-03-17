document.addEventListener("DOMContentLoaded", () => {

  let btnscrap = document.getElementById('scrap-profile');

  btnscrap.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (tab !== null) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrapingProfile,
      });
    }
  });
  
  const scrapingProfile = () => {

    let personal = new Object();
    let experience = new Object();
    let education = new Object();

    const wait = function (milliseconds) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, milliseconds);
      });
    };
  
    const autoScroll = (scrollTo) => {
      window.scroll({
        top: scrollTo,
        left: 0,
        behavior: 'smooth'
      });
    }

    function personalInfo() {

      const elementNameProfile = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 ul li");
      const elementNameTitle = document.querySelector("div.ph5.pb5 > div.display-flex.mt2 h2");
      const name = elementNameProfile ? elementNameProfile.innerText : '';
      const title = elementNameTitle ? elementNameTitle.innerText : '';
      const elementNameLocation = document.querySelector("ul.pv-top-card--list-bullet > li");
      const location = elementNameLocation ? elementNameLocation.innerText : '';
      const elementMoreResume = document.getElementById("line-clamp-show-more-button");
      const elementResume = document.querySelector("section.pv-about-section > p");
      const resume = elementResume ? elementResume.innerText : '';
  
      if (elementMoreResume) {
        elementMoreResume.click();
      }

      personal = { ...personal, name, title, location, resume }

    }
    
    function experienceInfo() {
      
      const elementAllExperience = document.querySelectorAll("ul.pv-profile-section__section-info > li > section");
  
      elementAllExperience.forEach((experienceItem, indexExperience) => {
        let positionData = new Object();
        const elementPositionGroup = experienceItem.querySelector("ul.pv-entity__position-group");
  
        // Multiple roles
        if(elementPositionGroup) {
          const elementPositionInfo = experienceItem.querySelector("div > a");
          const elementCompanyName = elementPositionInfo.querySelector("div.pv-entity__company-summary-info > h3 > span:nth-child(2)");
          const elementTotalDuration = elementPositionInfo.querySelector("div.pv-entity__company-summary-info > h4 > span:nth-child(2)");
          const companyName = elementCompanyName ? elementCompanyName.innerText : '';
          const companyTotalDuration = elementTotalDuration ? elementTotalDuration.innerText : '';
          const elementAllCompanyPosition = elementPositionGroup.querySelectorAll("li.pv-entity__position-group-role-item");
          
          elementAllCompanyPosition.forEach((position, indexPosition) => {
            const elementRoleContainer = position.querySelector("div.pv-entity__role-container > div");
            const elementRoleName = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > h3 > span:nth-child(2)");
            const roleName = elementRoleName ? elementRoleName.innerText : '';
            const elementRoleWorkday = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > h4");
            const roleWorkday = elementRoleWorkday ? elementRoleWorkday.innerText : '';
            const elementEmploymentDate = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > div > h4 > span:nth-child(2)");
            const employmentDate = elementEmploymentDate ? elementEmploymentDate.innerText : '';
            const elementEmploymentDuration = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > div > h4:nth-child(2) > span:nth-child(2)");
            const employmentDuration = elementEmploymentDuration ? elementEmploymentDuration.innerText : '';
            const elementRoleLocation = elementRoleContainer.querySelector("div.pv-entity__summary-info-v2 > h4.pv-entity__location > span:nth-child(2)");
            const roleLocation = elementRoleLocation ? elementRoleLocation.innerText : '';
            const elementRoleDetails = elementRoleContainer.querySelector("div.pv-entity__extra-details > p");
            const roleDetails = elementRoleDetails ? elementRoleDetails.innerText : '';
  
            positionData = { ...positionData, [indexPosition]: { roleName, roleWorkday, employmentDate, employmentDuration, roleLocation , roleDetails } }
          });
  
          experience = { ...experience, [indexExperience] : { companyName, companyTotalDuration, positionData} }
  
        } else {
          const elementPositionInfo = experienceItem.querySelector("div > div");
          const elementRoleName = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > h3");
          const roleName = elementRoleName ? elementRoleName.innerText : '';
          const elementCompanyName = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > p.pv-entity__secondary-title");
          const companyName = elementCompanyName ? elementCompanyName.innerText : '';
          const elementRoleWorkday = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > p.pv-entity__secondary-title > span.pv-entity__secondary-title");
          const roleWorkday = elementRoleWorkday ? elementRoleWorkday.innerText : '';
          const elementEmploymentDate = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > div > h4.pv-entity__date-range > span:nth-child(2)");
          const employmentDate = elementEmploymentDate ? elementEmploymentDate.innerText : '';
          const elementEmploymentDuration = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > div > h4:nth-child(2) > span:nth-child(2)");
          const employmentDuration = elementEmploymentDuration ? elementEmploymentDuration.innerText : '';
          const elementRoleLocation = elementPositionInfo.querySelector("a > div.pv-entity__summary-info > h4.pv-entity__location > span:nth-child(2)");
          const roleLocation = elementRoleLocation ? elementRoleLocation.innerText : '';
          const elementRoleDetails = elementPositionInfo.querySelector("div.pv-entity__extra-details > p");
          const roleDetails = elementRoleDetails ? elementRoleDetails.innerText : '';
          experience = { ...experience, [indexExperience] : { companyName, positionData: { [0] : { roleName, roleWorkday, employmentDate, employmentDuration, roleLocation, roleDetails } } } }
        }
      });
    }

    function educationInfo() {
      const elementAllEducation = document.querySelectorAll("section#education-section > ul.pv-profile-section__section-info > li");
  
      elementAllEducation.forEach((educationItem, indexEducation) => {
        const elementSchoolName = educationItem.querySelector("div.pv-entity__degree-info > h3");
        const schoolName = elementSchoolName ? elementSchoolName.innerText : '';
        const elementDegreeName = educationItem.querySelector("div.pv-entity__summary-info > div.pv-entity__degree-info > p.pv-entity__degree-name > span:nth-child(2)");
        const degreeName = elementDegreeName ? elementDegreeName.innerText : '';
        const elementDisciplineName = educationItem.querySelector("div.pv-entity__summary-info > div.pv-entity__degree-info > p.pv-entity__fos > span:nth-child(2)");
        const disciplineName = elementDisciplineName ? elementDisciplineName.innerText : '';
        const elementSchoolStartDate = educationItem.querySelector("div.pv-entity__summary-info > p.pv-entity__dates > span:nth-child(2) > time:nth-child(1)");
        const schoolStartDate = elementSchoolStartDate ? elementSchoolStartDate.innerText : '';
        const elementSchoolEndDate = educationItem.querySelector("div.pv-entity__summary-info > p.pv-entity__dates > span:nth-child(2) > time:nth-child(2)");
        const schoolEndDate = elementSchoolEndDate ? elementSchoolEndDate.innerText : '';
        education = { ...education, [indexEducation] : { schoolName, degreeName, disciplineName, schoolStartDate, schoolEndDate } }
      });
    }

    autoScroll(2600);
    wait(3000).then(function() {
      personalInfo();
      experienceInfo();
      educationInfo();
      const objProfile = { personal, experience, education };
      console.log(objProfile);
    })
    
    
    /*
      Abrir información de contacto : Pendiente
      Si no existe experiencia o educación, espera : Pendiente
      Mostrar más en funciones : Pendiente
      IntersectionObserver: Pendiente
    */
  }
});