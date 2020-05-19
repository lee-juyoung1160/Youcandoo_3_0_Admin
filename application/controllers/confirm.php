<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Confirm extends MY_Controller {

    public function lists()
        {
            $this->load->layout('confirm/confirm-list');
        }
}