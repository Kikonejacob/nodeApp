var node=[
      { title:"Students",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"liste", link:'./#students'},
            { title: "attendances", icon:"fa fa-money" , link:'./#students/attendance'},
            { title: "scolarships" , link:'./#students/scholarships'},
            { title:"Suppprimer", link:'./#students/delete'},
        ]
      },
      { title:"Admission",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"Student list", link:'./#students/admissions'},
            { title:"New admission", link:'./#students/admissions/add'},
        ]
      },
      { title:"Enrollments",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"list of enrolled students", link:'./#enrollments'},
            { title:"Enroll a student", link:'./#enrollments/enroll'},
        ]
      },
      { title:"Student groups",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"List of groups", link:'./#groups'},
            { title:"New Group", link:'./#groups/create'},
        ]
      },
      { title:"Student financial aid",
       icon:'fa fa-dashboard fa-fw ',
       link:"#",
       childNodes:[
           { title:"List of reductions", link:'./#reductions'},
           { title:"New Reduction", link:'./#reduction/create'},
       ]
     },
       { title:"Finance",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:" unpaid school fees", link:'./#students'},
            { title:"payment plans", link:'./#students/add'},
             { title:"fee payment", link:'./#students/add'},
        ]
      },
      { title:"Grades",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"Enter grades", link:'./#students'},
            { title:"Students grades", link:'./#students/add'},
        ]
      },
      { title:"Courses",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"New course", link:'./#students'},
            { title:"Courses", link:'./#students/add'},
        ]
      },
      { title:"Teachers",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"New teacher", link:'./#students'},
            { title:"Teachers list", link:'./#students/add'},
            { title:"Teachers classes", link:'./#students/add'},
        ]
      },
      { title:"Employees",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"Users", link:'./#students'},
            { title:"Users groups", link:'./#students/add'},
            { title:"Roles", link:'./#students/add'},
        ]
      },
      { title:"School",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"information", link:'./#school/info'},
        ]
      },
     { title:"Academic years",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"change current academic year", link:'./#acyears/current'},
            { title:"create academic year", link:'./#acyears/create'},
            { title:"list of acade￼mic years", link:'./#acyears/list'},
        ]
      },
      { title:"Classes",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"create", link:'./#classes/create'},
            { title:"list of classes ", link:'./#classes'},
        ]
      },
      { title:"Levels",
        icon:'fa fa-dashboard fa-fw ',
        link:"#",
        childNodes:[
            { title:"create", link:'./#studylevels/create'},
            { title:"list of levels ", link:'./#studylevels'},
        ]
      },
      {  title:"Configuration",
         icon:"fa fa-cog",
         link:"#",

       },
       {  title:"Subjects",
         icon:"fa fa-dashboard fa-fw ",
         link:"./#subjects",

       },
       {  title:"Fee heads",
         icon:"fa fa-dashboard fa-fw ",
         link:"./#feeheads",

       }

];

export default node;
