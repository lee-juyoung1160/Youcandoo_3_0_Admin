<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Ucd extends MY_Controller {

    public function index()
    {
        $this->load->template('v2/ucd/ucd-system-list');
    }

    public function doit()
    {
        $this->load->template('v2/ucd/ucd-doit-list');
    }

    public function user()
    {
        $this->load->template('v2/ucd/ucd-user-list');
    }

    public function waiting()
    {
        $this->load->template('v2/ucd/ucd-waiting-list');
    }

    public function charge()
    {
        $this->load->template('v2/ucd/ucd-charge-list');
    }

    public function create()
    {
        $this->load->template('v2/ucd/ucd-charge-create');
    }

}


