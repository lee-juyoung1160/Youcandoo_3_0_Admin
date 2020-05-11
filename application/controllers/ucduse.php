<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucduse extends CI_Controller {

    public function lists()
        {
            $this->load->layout('ucd-use/ucd-use-list');
        }
    public function create()
        {
            $this->load->layout('ucd-use/ucd-use-create');
        }

}