<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends MY_Controller {

    public function action()
    {
        $this->load->template('v2/report/action-list');
    }

    public function talk()
    {
        $this->load->template('v2/report/talk-list');
    }

}


