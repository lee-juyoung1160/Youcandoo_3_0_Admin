<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucdcharge extends CI_Controller {

    public function lists()
    {
        $this->load->layout('ucd-charge/ucd-charge-list');
    }

}