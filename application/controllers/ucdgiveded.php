<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ucdgiveded extends CI_Controller {

    public function create()
    {
        $this->load->layout('ucd-give-deduct/ucd-give-deduct-create');
    }

    public function lists()
        {
            $this->load->layout('ucd-give-deduct/ucd-give-deduct-list');
        }

}