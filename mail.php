<?php
function redirect($lang, $valid){//redirection function depending on the language and the result 
    if($valid){
        if($lang === 'fr'){
            header("Location: https://tom-tamen.fr/index.php?res=ok");//no error french redirection
        }else{
            header("Location: https://tom-tamen.fr/en/index.php?res=ok");//no error english redirection
        }
    }else{
        if($lang === 'fr'){
            header("Location: https://tom-tamen.fr/index.php?res=err");//error french redirection
        }else{
            header("Location: https://tom-tamen.fr/en/index.php?res=err");//error english redirection
        }
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){//detect if the form is sent
    if(isset($_POST['valid']) && empty($_POST['valid'])){//honeypot technique to avoid robots
        if(isset($_POST['lang']) && !empty($_POST['lang']) && $_POST['lang'] == "fr" || $_POST['lang']=="en"){//check the language to avoid an error in the redirection
            $lang = htmlspecialchars($_POST["lang"]);//memorizes the language
            if(//checks if the required fields are filled in
                isset($_POST["identity"]) && !empty($_POST["identity"]) &&
                isset($_POST["email"]) && !empty($_POST["email"]) &&
                isset($_POST["obj"]) && !empty($_POST["obj"]) &&
                isset($_POST["msg"]) && !empty($_POST["msg"])
            ){
                $email = htmlspecialchars($_POST["email"]);//memorizes the email
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {//check if the email is valid
                    $identity = htmlspecialchars($_POST["identity"]);//memorizes the name
                    $obj = htmlspecialchars($_POST["obj"]);//memorizes the object
                    $msg = htmlspecialchars($_POST["msg"]);//memorizes the message
                    if(empty($_POST["phone"])){//give a value if the not required fields are empty
                        $phone="Vide";
                    }else{
                        $phone=htmlspecialchars($_POST["phone"]);//memorizes the phone
                    }
                    $full = "Émetteur : ".$identity."\nEmail : ".$email."\nTéléphone : ".$phone."\nMessage : \n".$msg;//formatted the content of the email
                    $send = mail('contact@tom-tamen.fr',$obj,$full);//send the mail
                    if($send){
                        redirect($lang, true); //redirect to the success message
                    }else{
                        redirect($lang, false);//redirect to the fail message
                    }
                }else{
                    redirect($lang, false);//redirect to the fail message
                }
            }else{
                redirect($lang, false);//redirect to the fail message
            }
        }else{
            redirect($lang, false);//redirect to the fail message
        }
    }
}else{
    header("Location: https://tom-tamen.fr/");//if the user is on this page without the form being sent he is automatically redirected
}
?>