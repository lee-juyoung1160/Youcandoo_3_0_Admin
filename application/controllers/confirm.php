<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Confirm extends CI_Controller {

    public function lists()
        {
            $this->load->layout('confirm/confirm-list');
        }
}