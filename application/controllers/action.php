<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Action extends MY_Controller {

    public function lists()
        {
            $this->load->layout('action/action-list');
        }
}