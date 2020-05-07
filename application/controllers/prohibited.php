<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Prohibited extends CI_Controller {

    public function lists()
    {
        $this->load->layout('prohibited/prohibited-list');
    }

}