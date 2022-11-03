<?php
function redirect($lang, $valid){

    if($valid){
        if($lang === 'fr'){
            header("Location: https://tom-tamen.fr/index.php?res=ok");
        }else{
            header("Location: https://tom-tamen.fr/en/index.php?res=ok");
        }
    }else{
        if($lang === 'fr'){
            header("Location: https://tom-tamen.fr/index.php?res=err");
        }else{
            header("Location: https://tom-tamen.fr/en/index.php?res=err");
        }
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){

    if(isset($_POST['valid']) && empty($_POST['valid'])){
        if(isset($_POST['lang']) && !empty($_POST['lang']) && $_POST['lang'] == "fr" || $_POST['lang']=="en"){
            $lang = htmlspecialchars($_POST["lang"]);
            if(
                isset($_POST["identity"]) && !empty($_POST["identity"]) &&
                isset($_POST["email"]) && !empty($_POST["email"]) &&
                isset($_POST["obj"]) && !empty($_POST["obj"]) &&
                isset($_POST["msg"]) && !empty($_POST["msg"])
            ){
                $email = htmlspecialchars($_POST["email"]);
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
                    $identity = htmlspecialchars($_POST["identity"]);
                    $obj = htmlspecialchars($_POST["obj"]);
                    $msg = htmlspecialchars($_POST["msg"]);
                    if(empty($_POST["phone"])){
                        $phone="Vide";
                    }else{
                        $phone=htmlspecialchars($_POST["phone"]);
                    }

                    $full = "Émetteur : ".$identity."\n Email : ".$email."\n Téléphone : ".$phone."\n Message : ".$msg;
                    $send = mail('contact@tom-tamen.fr',$obj,$full);
                    if($send){
                        redirect($lang, true);
                    }else{
                        redirect($lang, false);
                    }
                }else{
                    redirect($lang, false);
                }
            }else{
                redirect($lang, false);
            }
        }else{
            redirect($lang, false);
        }
    }
}else{
    header("Location: https://tom-tamen.fr/");
}
?>